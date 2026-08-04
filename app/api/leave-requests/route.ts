import { desc, eq } from "drizzle-orm";
import { getD1, getDb } from "../../../db";
import { compLeaveClaims, leaveRequests, staffMembers } from "../../../db/schema";

type LeaveType = "AL" | "PL" | "CL" | "SL";
type LeaveSlot = { date: string; period: "早" | "午" | "晚" };
const validTypes: LeaveType[] = ["AL", "PL", "CL", "SL"];

function addMonths(value: string, months: number) {
  const date = new Date(`${value}T12:00:00Z`);
  date.setUTCMonth(date.getUTCMonth() + months);
  return date.toISOString().slice(0, 10);
}

function buildCompLedger(
  staffId: string,
  claims: Array<typeof compLeaveClaims.$inferSelect>,
  requests: Array<typeof leaveRequests.$inferSelect>,
) {
  const credits = claims.filter((item) => item.staffId === staffId).map((item) => {
    const appliedDate = item.createdAt.slice(0, 10);
    return {
      id: item.id,
      appliedDate,
      earnedWeek: item.weekStart,
      expiryDate: addMonths(appliedDate, 3),
      earnedDays: Number(item.sections) / 3,
      remainingDays: Number(item.sections) / 3,
    };
  }).sort((a, b) => a.expiryDate.localeCompare(b.expiryDate));

  const uses = requests.filter((item) => item.staffId === staffId && item.leaveType === "CL" && item.status === "approved")
    .sort((a, b) => a.startDate.localeCompare(b.startDate));
  for (const use of uses) {
    let needed = Number(use.sections) / 3;
    for (const credit of credits) {
      if (needed <= 0) break;
      if (credit.appliedDate > use.startDate || credit.expiryDate < use.startDate || credit.remainingDays <= 0) continue;
      const deducted = Math.min(credit.remainingDays, needed);
      credit.remainingDays -= deducted;
      needed -= deducted;
    }
  }
  const today = new Date().toISOString().slice(0, 10);
  return {
    credits: credits.map((credit) => ({ ...credit, expired: credit.expiryDate < today })),
    earned: credits.reduce((sum, credit) => sum + credit.earnedDays, 0),
    used: uses.reduce((sum, item) => sum + Number(item.sections) / 3, 0),
    remaining: credits.filter((credit) => credit.expiryDate >= today).reduce((sum, credit) => sum + credit.remainingDays, 0),
    expired: credits.filter((credit) => credit.expiryDate < today).reduce((sum, credit) => sum + credit.remainingDays, 0),
  };
}

export async function GET(request: Request) {
  try {
    const staffId = new URL(request.url).searchParams.get("staffId") ?? "";
    const db = await getDb();
    const requests = staffId
      ? await db.select().from(leaveRequests).where(eq(leaveRequests.staffId, staffId)).orderBy(desc(leaveRequests.createdAt))
      : await db.select().from(leaveRequests).orderBy(desc(leaveRequests.createdAt));
    const people = await db.select().from(staffMembers);
    const claims = await db.select().from(compLeaveClaims);
    const summaries = people.map((person) => {
      const approved = requests.filter((item) => item.staffId === person.id && item.status === "approved");
      const pending = requests.filter((item) => item.staffId === person.id && item.status === "pending");
      // 出席表每天分早、午、晚三節；假期結餘統一以「日」計算。
      const annualUsed = approved.filter((item) => item.leaveType === "AL").reduce((sum, item) => sum + Number(item.sections) / 3, 0);
      const compLedger = buildCompLedger(person.id, claims, requests);
      const annualEntitlement = Math.min(30, Number(person.annualLeaveEntitlement));
      return {
        staffId: person.id,
        annualEntitlement,
        annualUsed,
        annualRemaining: Math.max(0, annualEntitlement - annualUsed),
        compEarned: compLedger.earned,
        compUsed: compLedger.used,
        compRemaining: compLedger.remaining,
        compExpired: compLedger.expired,
        compCredits: compLedger.credits,
        pendingDays: pending.reduce((sum, item) => sum + Number(item.sections) / 3, 0),
      };
    });
    return Response.json({ requests, summaries });
  } catch (error) {
    console.error("Leave load failed", error);
    return Response.json({ requests: [], summaries: [] });
  }
}

export async function POST(request: Request) {
  const body = await request.json() as {
    staffId?: string; staffName?: string; leaveType?: LeaveType; startDate?: string; endDate?: string;
    slots?: LeaveSlot[]; reason?: string; destination?: string; workArrangement?: string; compSource?: string;
  };
  if (!body.staffId || !body.staffName || !body.leaveType || !validTypes.includes(body.leaveType) ||
      !body.startDate || !body.endDate || !body.slots?.length) {
    return Response.json({ error: "請選擇假別、日期及至少一個時段" }, { status: 400 });
  }
  if (body.leaveType === "CL" && !body.compSource?.trim()) {
    return Response.json({ error: "補假請註明相關超時工作" }, { status: 400 });
  }
  const unique = [...new Map(body.slots.map((slot) => [`${slot.date}-${slot.period}`, slot])).values()];
  try {
    if (body.leaveType === "CL") {
      const db = await getDb();
      const claims = await db.select().from(compLeaveClaims);
      const existingRequests = await db.select().from(leaveRequests);
      const available = buildCompLedger(body.staffId, claims, existingRequests).remaining;
      const requestedDays = unique.length / 3;
      if (requestedDays > available + 0.0001) {
        return Response.json({ error: `可用補假只有 ${available.toFixed(2)} 日，不能遞交超額申請` }, { status: 400 });
      }
    }
    const now = new Date().toISOString();
    const id = crypto.randomUUID();
    const d1 = await getD1();
    await d1.prepare(`INSERT INTO leave_requests
      (id, staff_id, staff_name, leave_type, start_date, end_date, slots_json, sections, reason, destination, work_arrangement, comp_source, status, review_note, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', '', ?, ?)`)
      .bind(id, body.staffId, body.staffName, body.leaveType, body.startDate, body.endDate,
        JSON.stringify(unique), unique.length, body.reason?.trim() ?? "", body.destination?.trim() ?? "",
        body.workArrangement?.trim() ?? "", body.compSource?.trim() ?? "", now, now).run();
    return Response.json({ ok: true, id });
  } catch (error) {
    console.error("Leave submit failed", error);
    return Response.json({ error: "未能遞交假期申請" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const body = await request.json() as { id?: string; status?: "approved" | "rejected"; reviewNote?: string };
  if (!body.id || !["approved", "rejected"].includes(body.status ?? "")) {
    return Response.json({ error: "缺少批核資料" }, { status: 400 });
  }
  try {
    const db = await getDb();
    const [item] = await db.select().from(leaveRequests).where(eq(leaveRequests.id, body.id));
    if (!item || item.status !== "pending") return Response.json({ error: "申請已處理或不存在" }, { status: 409 });
    if (body.status === "approved" && item.leaveType === "CL") {
      const claims = await db.select().from(compLeaveClaims);
      const existingRequests = await db.select().from(leaveRequests);
      const available = buildCompLedger(item.staffId, claims, existingRequests).remaining;
      const requestedDays = Number(item.sections) / 3;
      if (requestedDays > available + 0.0001) {
        return Response.json({ error: `有效補假只餘 ${available.toFixed(2)} 日，不能批准此申請` }, { status: 400 });
      }
    }
    const d1 = await getD1();
    const now = new Date().toISOString();
    const statements = [d1.prepare("UPDATE leave_requests SET status = ?, review_note = ?, reviewed_at = ?, updated_at = ? WHERE id = ?")
      .bind(body.status, body.reviewNote?.trim() ?? "", now, now, body.id)];
    if (body.status === "approved") {
      const slots = JSON.parse(item.slotsJson) as LeaveSlot[];
      for (const slot of slots) {
        statements.push(d1.prepare("DELETE FROM attendance WHERE staff_id = ? AND work_date = ? AND period = ?")
          .bind(item.staffId, slot.date, slot.period));
        statements.push(d1.prepare(`INSERT INTO attendance
          (staff_id, staff_name, role, period, status, note, work_date, updated_at)
          VALUES (?, ?, '', ?, ?, ?, ?, ?)`)
          .bind(item.staffId, item.staffName, slot.period, item.leaveType, item.reason, slot.date, now));
      }
    }
    await d1.batch(statements);
    return Response.json({ ok: true });
  } catch (error) {
    console.error("Leave review failed", error);
    return Response.json({ error: "未能處理申請" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return Response.json({ error: "缺少申請資料" }, { status: 400 });
  try {
    const db = await getDb();
    const [item] = await db.select().from(leaveRequests).where(eq(leaveRequests.id, id));
    if (!item) return Response.json({ error: "申請不存在" }, { status: 404 });
    const d1 = await getD1();
    const statements = [];
    // 已批准的假期同時從出席表移除，確保假期結餘與出席記錄一致。
    if (item.status === "approved") {
      const slots = JSON.parse(item.slotsJson) as LeaveSlot[];
      for (const slot of slots) {
        statements.push(d1.prepare(
          "DELETE FROM attendance WHERE staff_id = ? AND work_date = ? AND period = ? AND status = ?",
        ).bind(item.staffId, slot.date, slot.period, item.leaveType));
      }
    }
    statements.push(d1.prepare("DELETE FROM leave_requests WHERE id = ?").bind(id));
    await d1.batch(statements);
    return Response.json({ ok: true });
  } catch (error) {
    console.error("Leave delete failed", error);
    return Response.json({ error: "未能刪除申請" }, { status: 500 });
  }
}
