CREATE TABLE `leave_requests` (
	`id` text PRIMARY KEY NOT NULL,
	`staff_id` text NOT NULL,
	`staff_name` text NOT NULL,
	`leave_type` text NOT NULL,
	`start_date` text NOT NULL,
	`end_date` text NOT NULL,
	`slots_json` text NOT NULL,
	`sections` real NOT NULL,
	`reason` text DEFAULT '' NOT NULL,
	`destination` text DEFAULT '' NOT NULL,
	`work_arrangement` text DEFAULT '' NOT NULL,
	`comp_source` text DEFAULT '' NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`review_note` text DEFAULT '' NOT NULL,
	`reviewed_at` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
ALTER TABLE `staff_members` ADD `annual_leave_entitlement` real DEFAULT 0 NOT NULL;