import { and, gte, lte } from "drizzle-orm";
import { getD1, getDb } from "../../../db";
import { attendance } from "../../../db/schema";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const start = url.searchParams.get("start") ?? "2026-07-20";
    const end = url.searchParams.get("end") ?? "2026-08-02";
    const db = await getDb();
    const rows = await db
      .select()
      .from(attendance)
      .where(and(gte(attendance.workDate, start), lte(attendance.workDate, end)))
      .orderBy(attendance.workDate, attendance.id);
    return Response.json({ rows });
  } catch {
    return Response.json({ rows: [] });
  }
}

export async function POST(request: Request) {
  const body = await request.json() as {
    start?: string;
    end?: string;
    rows?: Array<{
      staffId: string;
      staffName: string;
      role: string;
      period: string;
      status: string;
      note: string;
      workDate: string;
    }>;
  };
  if (!body.start || !body.end || !body.rows) {
    return Response.json({ error: "缺少日期或出席資料" }, { status: 400 });
  }
  try {
    const d1 = await getD1();
    const statements = [
      d1.prepare("DELETE FROM attendance WHERE work_date >= ? AND work_date <= ?")
        .bind(body.start, body.end),
    ];

    // D1 limits the number of bound values in one SQL statement. The full
    // fortnight contains 126 rows, so write ten rows per statement and execute
    // the whole replacement atomically as one batch.
    const now = new Date().toISOString();
    for (let index = 0; index < body.rows.length; index += 10) {
      const chunk = body.rows.slice(index, index + 10);
      const placeholders = chunk.map(() => "(?, ?, ?, ?, ?, ?, ?, ?)").join(", ");
      const values = chunk.flatMap((row) => [
        row.staffId,
        row.staffName,
        row.role,
        row.period,
        row.status,
        row.note,
        row.workDate,
        now,
      ]);
      statements.push(
        d1.prepare(
          `INSERT INTO attendance
            (staff_id, staff_name, role, period, status, note, work_date, updated_at)
           VALUES ${placeholders}`,
        ).bind(...values),
      );
    }
    await d1.batch(statements);
    return Response.json({ ok: true, saved: body.rows.length });
  } catch (error) {
    console.error("Attendance save failed", error);
    return Response.json(
      { error: error instanceof Error ? error.message : "未能儲存" },
      { status: 500 },
    );
  }
}
