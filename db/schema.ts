import { integer, real, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const attendance = sqliteTable("attendance", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  staffId: text("staff_id").notNull(),
  staffName: text("staff_name").notNull(),
  role: text("role").notNull(),
  period: text("period").notNull(),
  status: text("status").notNull(),
  note: text("note").notNull().default(""),
  workDate: text("work_date").notNull().default("2026-07-23"),
  updatedAt: text("updated_at").notNull(),
});

export const compLeaveClaims = sqliteTable("comp_leave_claims", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  staffId: text("staff_id").notNull(),
  staffName: text("staff_name").notNull(),
  weekStart: text("week_start").notNull(),
  weekEnd: text("week_end").notNull(),
  sections: real("sections").notNull(),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
}, (table) => [
  uniqueIndex("comp_leave_staff_week_idx").on(table.staffId, table.weekStart),
]);

export const staffMembers = sqliteTable("staff_members", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  weeklyTarget: real("weekly_target").notNull(),
  annualLeaveEntitlement: real("annual_leave_entitlement").notNull().default(0),
  active: integer("active").notNull().default(1),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const leaveRequests = sqliteTable("leave_requests", {
  id: text("id").primaryKey(),
  staffId: text("staff_id").notNull(),
  staffName: text("staff_name").notNull(),
  leaveType: text("leave_type").notNull(),
  startDate: text("start_date").notNull(),
  endDate: text("end_date").notNull(),
  slotsJson: text("slots_json").notNull(),
  sections: real("sections").notNull(),
  reason: text("reason").notNull().default(""),
  destination: text("destination").notNull().default(""),
  workArrangement: text("work_arrangement").notNull().default(""),
  compSource: text("comp_source").notNull().default(""),
  status: text("status").notNull().default("pending"),
  reviewNote: text("review_note").notNull().default(""),
  reviewedAt: text("reviewed_at"),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});
