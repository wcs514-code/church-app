import { asc, eq } from "drizzle-orm";
import { getD1, getDb } from "../../../db";
import { staffMembers } from "../../../db/schema";

const initialStaff = [
  { id: "wu", name: "胡牧師", role: "堂主任 · 全職", weeklyTarget: 11, annualLeaveEntitlement: 0 },
  { id: "joy", name: "JOY", role: "行政幹事 · 半職", weeklyTarget: 6, annualLeaveEntitlement: 0 },
  { id: "cleaner", name: "清潔事務員", role: "清潔同工 · 半職", weeklyTarget: 6, annualLeaveEntitlement: 0 },
];

export async function GET() {
  try {
    const db = await getDb();
    let rows = await db.select().from(staffMembers)
      .where(eq(staffMembers.active, 1)).orderBy(asc(staffMembers.createdAt));
    if (!rows.length) {
      const d1 = await getD1();
      const now = new Date().toISOString();
      await d1.batch(initialStaff.map((person) => d1.prepare(
        `INSERT OR IGNORE INTO staff_members
          (id, name, role, weekly_target, annual_leave_entitlement, active, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, 1, ?, ?)`,
      ).bind(person.id, person.name, person.role, person.weeklyTarget, person.annualLeaveEntitlement, now, now)));
      rows = await db.select().from(staffMembers)
        .where(eq(staffMembers.active, 1)).orderBy(asc(staffMembers.createdAt));
    }
    return Response.json({ staff: rows });
  } catch (error) {
    console.error("Staff load failed", error);
    return Response.json({ error: "未能載入同工名單" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const body = await request.json() as { name?: string; role?: string; weeklyTarget?: number; annualLeaveEntitlement?: number };
  const name = body.name?.trim();
  const role = body.role?.trim();
  const weeklyTarget = Number(body.weeklyTarget);
  if (!name || !role || !Number.isFinite(weeklyTarget) || weeklyTarget <= 0) {
    return Response.json({ error: "請填寫同工姓名、職位及每週節數" }, { status: 400 });
  }
  try {
    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    const d1 = await getD1();
    await d1.prepare(
      `INSERT INTO staff_members
        (id, name, role, weekly_target, annual_leave_entitlement, active, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, 1, ?, ?)`,
    ).bind(id, name, role, weeklyTarget, Number(body.annualLeaveEntitlement) || 0, now, now).run();
    return Response.json({ staff: { id, name, role, weeklyTarget, annualLeaveEntitlement: Number(body.annualLeaveEntitlement) || 0 } });
  } catch (error) {
    console.error("Staff add failed", error);
    return Response.json({ error: "未能新增同工" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const body = await request.json() as { id?: string; annualLeaveEntitlement?: number };
  const entitlement = Number(body.annualLeaveEntitlement);
  if (!body.id || !Number.isFinite(entitlement) || entitlement < 0 || entitlement > 30) {
    return Response.json({ error: "年假日數必須介乎0至30日" }, { status: 400 });
  }
  try {
    const d1 = await getD1();
    await d1.prepare("UPDATE staff_members SET annual_leave_entitlement = ?, updated_at = ? WHERE id = ?")
      .bind(entitlement, new Date().toISOString(), body.id).run();
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "未能更新年假設定" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return Response.json({ error: "缺少同工資料" }, { status: 400 });
  try {
    const d1 = await getD1();
    await d1.prepare(
      "UPDATE staff_members SET active = 0, updated_at = ? WHERE id = ?",
    ).bind(new Date().toISOString(), id).run();
    return Response.json({ ok: true });
  } catch (error) {
    console.error("Staff remove failed", error);
    return Response.json({ error: "未能移除同工" }, { status: 500 });
  }
}
