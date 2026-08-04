CREATE TABLE `attendance` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`staff_id` text NOT NULL,
	`staff_name` text NOT NULL,
	`role` text NOT NULL,
	`period` text NOT NULL,
	`status` text NOT NULL,
	`note` text DEFAULT '' NOT NULL,
	`work_date` text DEFAULT '2026-07-23' NOT NULL,
	`updated_at` text NOT NULL
);
