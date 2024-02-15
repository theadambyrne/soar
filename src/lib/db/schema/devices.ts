import { sql } from "drizzle-orm";
import { text, sqliteTable, uniqueIndex } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getDevices } from "@/lib/api/devices/queries";

import { nanoid, timestamps } from "@/lib/utils";

export const devices = sqliteTable(
	"devices",
	{
		id: text("id")
			.primaryKey()
			.$defaultFn(() => nanoid()),
		name: text("name").notNull(),
		serial: text("serial").notNull(),
		userId: text("user_id").notNull(),

		createdAt: text("created_at")
			.notNull()
			.default(sql`CURRENT_TIMESTAMP`),
		updatedAt: text("updated_at")
			.notNull()
			.default(sql`CURRENT_TIMESTAMP`),
	},
	(devices) => {
		return {
			serialIndex: uniqueIndex("serial_idx").on(devices.serial),
		};
	}
);

// Schema for devices - used to validate API requests
const baseSchema = createSelectSchema(devices).omit(timestamps);

export const insertDeviceSchema = createInsertSchema(devices).omit(timestamps);
export const insertDeviceParams = baseSchema.extend({}).omit({
	id: true,
	userId: true,
});

export const updateDeviceSchema = baseSchema;
export const updateDeviceParams = baseSchema.extend({}).omit({
	userId: true,
});
export const deviceIdSchema = baseSchema.pick({ id: true });

// Types for devices - used to type API request params and within Components
export type Device = typeof devices.$inferSelect;
export type NewDevice = z.infer<typeof insertDeviceSchema>;
export type NewDeviceParams = z.infer<typeof insertDeviceParams>;
export type UpdateDeviceParams = z.infer<typeof updateDeviceParams>;
export type DeviceId = z.infer<typeof deviceIdSchema>["id"];

// this type infers the return from getDevices() - meaning it will include any joins
export type CompleteDevice = Awaited<
	ReturnType<typeof getDevices>
>["devices"][number];
