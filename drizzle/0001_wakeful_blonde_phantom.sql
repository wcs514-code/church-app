CREATE TABLE `comp_leave_claims` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`staff_id` text NOT NULL,
	`staff_name` text NOT NULL,
	`week_start` text NOT NULL,
	`week_end` text NOT NULL,
	`sections` real NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `comp_leave_staff_week_idx` ON `comp_leave_claims` (`staff_id`,`week_start`);