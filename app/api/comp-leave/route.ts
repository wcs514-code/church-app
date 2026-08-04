import { and, eq, inArray, sql } from "drizzle-orm";
import { getD1, getDb } from "../../../db";
import { compLeaveClaims } from "../../../db/schema";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const staffId = url.searchParams.get("staffId");
  const weekStarts = [url.searchParams.get("week1"), url.searchParams.get("week2")]
    .filter((value): value is string => Boolean(value));

  if (!staffId) {
    return Response.json({ error: "缺少同工資料" }, { status: 400 });
  }

  try {
    const db = await getDb();
    const claims = weekStarts.length
      ? await db.select().from(compLeaveClaims)
          .where(and(eq(compLeaveClaims.staffId, staffId), inArray(compLeaveClaims.weekStart, weekStarts)))
      : [];
    const [summary] = await db.select({
      total: sql<number>`coalesce(sum(${compLeaveClaims.sections}), 0)`,
    }).from(compLeaveClaims).where(eq(compLeaveClaims.staffId, staffId));
    return Response.json({ claims, total: Number(summary?.total ?? 0) });
  } catch (error) {
    console.error("Comp leave load failed", error);
    return Response.json({ error: "未能載入補假申請" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const body = await request.json() as {
    staffId?: string;
    staffName?: string;
    weekStart?: string;
    weekEnd?: string;
    sections?: number;
    applied?: boolean;
  };

  if (!body.staffId || !body.staffName || !body.weekStart || !body.weekEnd) {
    return Response.json({ error: "缺少補假申請資料" }, { status: 400 });
  }

  try {
    const d1 = await getD1();
    if (!body.applied) {
      await d1.prepare(
        "DELETE FROM comp_leave_claims WHERE staff_id = ? AND week_start = ?",
      ).bind(body.staffId, body.weekStart).run();
    } else {
      const sections = Math.max(0, Number(body.sections ?? 0));
      if (sections <= 0) {
        return Response.json({ error: "本週沒有可申請的補假節數" }, { status: 400 });
      }
      const now = new Date().toISOString();
      await d1.prepare(
        `INSERT INTO comp_leave_claims
          (staff_id, staff_name, week_start, week_end, sections, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?)
         ON CONFLICT(staff_id, week_start) DO UPDATE SET
          staff_name = excluded.staff_name,
          week_end = excluded.week_end,
          sections = excluded.sections,
          updated_at = excluded.updated_at`,
      ).bind(
        body.staffId,
        body.staffName,
        body.weekStart,
        body.weekEnd,
        sections,
        now,
        now,
      ).run();
    }
    return Response.json({ ok: true });
  } catch (error) {
    console.error("Comp leave update failed", error);
    return Response.json({ error: "未能更新補假申請" }, { status: 500 });
  }
}
