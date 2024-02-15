CREATE TABLE `devices` (
	`id` text NOT NULL,
	`name` text NOT NULL,
	`serial` text NOT NULL,
	`user_id` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `serial_idx` ON `devices` (`serial`);