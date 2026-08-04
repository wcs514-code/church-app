import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const backup = JSON.parse(readFileSync(resolve(root, "attendance-export.json"), "utf8"));

const quote = (value) => {
  if (value === null || value === undefined) return "NULL";
  if (typeof value === "number") return Number.isFinite(value) ? String(value) : "NULL";
  return `'${String(value).replaceAll("'", "''")}'`;
};

const lines = [
  "PRAGMA foreign_keys=OFF;",
  "BEGIN TRANSACTION;",
  `CREATE TABLE IF NOT EXISTS attendance (id integer PRIMARY KEY AUTOINCREMENT NOT NULL, staff_id text NOT NULL, staff_name text NOT NULL, role text NOT NULL, period text NOT NULL, status text NOT NULL, note text DEFAULT '' NOT NULL, work_date text DEFAULT '2026-07-23' NOT NULL, updated_at text NOT NULL);`,
  `CREATE TABLE IF NOT EXISTS comp_leave_claims (id integer PRIMARY KEY AUTOINCREMENT NOT NULL, staff_id text NOT NULL, staff_name text NOT NULL, week_start text NOT NULL, week_end text NOT NULL, sections real NOT NULL, created_at text NOT NULL, updated_at text NOT NULL);`,
  `CREATE UNIQUE INDEX IF NOT EXISTS comp_leave_staff_week_idx ON comp_leave_claims (staff_id, week_start);`,
  `CREATE TABLE IF NOT EXISTS staff_members (id text PRIMARY KEY NOT NULL, name text NOT NULL, role text NOT NULL, weekly_target real NOT NULL, annual_leave_entitlement real DEFAULT 0 NOT NULL, active integer DEFAULT 1 NOT NULL, created_at text NOT NULL, updated_at text NOT NULL);`,
  `CREATE TABLE IF NOT EXISTS leave_requests (id text PRIMARY KEY NOT NULL, staff_id text NOT NULL, staff_name text NOT NULL, leave_type text NOT NULL, start_date text NOT NULL, end_date text NOT NULL, slots_json text NOT NULL, sections real NOT NULL, reason text DEFAULT '' NOT NULL, destination text DEFAULT '' NOT NULL, work_arrangement text DEFAULT '' NOT NULL, comp_source text DEFAULT '' NOT NULL, status text DEFAULT 'pending' NOT NULL, review_note text DEFAULT '' NOT NULL, reviewed_at text, created_at text NOT NULL, updated_at text NOT NULL);`,
];

for (const row of backup.staffMembers ?? []) {
  lines.push(`INSERT OR REPLACE INTO staff_members (id,name,role,weekly_target,annual_leave_entitlement,active,created_at,updated_at) VALUES (${[row.id,row.name,row.role,row.weeklyTarget,row.annualLeaveEntitlement,row.active,row.createdAt,row.updatedAt].map(quote).join(",")});`);
}

for (const row of backup.attendance ?? []) {
  lines.push(`INSERT OR REPLACE INTO attendance (id,staff_id,staff_name,role,period,status,note,work_date,updated_at) VALUES (${[row.id,row.staffId,row.staffName,row.role,row.period,row.status,row.note,row.workDate,row.updatedAt].map(quote).join(",")});`);
}

for (const row of backup.compLeaveClaims ?? []) {
  lines.push(`INSERT OR REPLACE INTO comp_leave_claims (id,staff_id,staff_name,week_start,week_end,sections,created_at,updated_at) VALUES (${[row.id,row.staffId,row.staffName,row.weekStart,row.weekEnd,row.sections,row.createdAt,row.updatedAt].map(quote).join(",")});`);
}

for (const row of backup.leaveRequests ?? []) {
  lines.push(`INSERT OR REPLACE INTO leave_requests (id,staff_id,staff_name,leave_type,start_date,end_date,slots_json,sections,reason,destination,work_arrangement,comp_source,status,review_note,reviewed_at,created_at,updated_at) VALUES (${[row.id,row.staffId,row.staffName,row.leaveType,row.startDate,row.endDate,row.slotsJson,row.sections,row.reason,row.destination,row.workArrangement,row.compSource,row.status,row.reviewNote,row.reviewedAt,row.createdAt,row.updatedAt].map(quote).join(",")});`);
}

lines.push("COMMIT;", "PRAGMA foreign_keys=ON;");
writeFileSync(resolve(root, "cloudflare-d1-import.sql"), `${lines.join("\n")}\n`);
console.log(`Prepared ${backup.attendance?.length ?? 0} attendance rows, ${backup.staffMembers?.length ?? 0} staff rows, ${backup.leaveRequests?.length ?? 0} leave requests, and ${backup.compLeaveClaims?.length ?? 0} comp-leave claims.`);
