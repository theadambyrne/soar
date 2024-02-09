CREATE TABLE `flights` (
	`id` text PRIMARY KEY NOT NULL,
	`recorded_at` integer NOT NULL,
	`data` text NOT NULL,
	`computer` text NOT NULL,
	`user_id` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `recorded_at_idx` ON `flights` (`recorded_at`);