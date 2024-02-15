import {
	integer,
	text,
	sqliteTable,
	uniqueIndex,
} from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getFlights } from "@/lib/api/flights/queries";

import { nanoid } from "@/lib/utils";

export const flights = sqliteTable(
	"flights",
	{
		id: text("id")
			.primaryKey()
			.$defaultFn(() => nanoid()),
		recordedAt: integer("recorded_at", { mode: "timestamp" }).notNull(),
		data: text("data").notNull(),
		userId: text("user_id").notNull(),
		deviceId: text("device_id").notNull(),
	},
	(flights) => {
		return {
			recordedAtIndex: uniqueIndex("recorded_at_idx").on(flights.recordedAt),
		};
	}
);

// Schema for flights - used to validate API requests
const baseSchema = createSelectSchema(flights);

export const insertFlightSchema = createInsertSchema(flights);
export const insertFlightParams = baseSchema
	.extend({
		recordedAt: z.coerce.date(),
	})
	.omit({
		id: true,
		userId: true,
	});

export const updateFlightSchema = baseSchema;
export const updateFlightParams = baseSchema
	.extend({
		recordedAt: z.coerce.date(),
	})
	.omit({
		userId: true,
	});
export const flightIdSchema = baseSchema.pick({ id: true });

// Types for flights - used to type API request params and within Components
export type Flight = typeof flights.$inferSelect;
export type NewFlight = z.infer<typeof insertFlightSchema>;
export type NewFlightParams = z.infer<typeof insertFlightParams>;
export type UpdateFlightParams = z.infer<typeof updateFlightParams>;
export type FlightId = z.infer<typeof flightIdSchema>["id"];

// this type infers the return from getFlights() - meaning it will include any joins
export type CompleteFlight = Awaited<
	ReturnType<typeof getFlights>
>["flights"][number];
