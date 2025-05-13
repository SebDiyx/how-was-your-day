CREATE TABLE `hwyd_dairy_entry` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user` text(256) NOT NULL,
	`date` integer NOT NULL,
	`rating` integer NOT NULL,
	`description` text(1024),
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	`updatedAt` integer
);
--> statement-breakpoint
CREATE INDEX `user_date_idx` ON `hwyd_dairy_entry` (`user`,`date`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_date_unique` ON `hwyd_dairy_entry` (`user`,`date`);