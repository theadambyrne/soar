import { sql } from "drizzle-orm";
import { text, sqliteTable, uniqueIndex } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getMessages } from "@/lib/api/messages/queries";

import { nanoid, timestamps } from "@/lib/utils";

export const messages = sqliteTable(
	"messages",
	{
		id: text("id")
			.primaryKey()
			.$defaultFn(() => nanoid()),
		content: text("content").notNull(),
		filepath: text("filepath").notNull(),
		userId: text("user_id").notNull(),

		createdAt: text("created_at")
			.notNull()
			.default(sql`CURRENT_TIMESTAMP`),
		updatedAt: text("updated_at")
			.notNull()
			.default(sql`CURRENT_TIMESTAMP`),
	},
	(messages) => {
		return {
			filepathIndex: uniqueIndex("filepath_idx").on(messages.filepath),
		};
	}
);

// Schema for messages - used to validate API requests
const baseSchema = createSelectSchema(messages).omit(timestamps);

export const insertMessageSchema =
	createInsertSchema(messages).omit(timestamps);
export const insertMessageParams = baseSchema.extend({}).omit({
	id: true,
	userId: true,
});

export const updateMessageSchema = baseSchema;
export const updateMessageParams = baseSchema.extend({}).omit({
	userId: true,
});
export const messageIdSchema = baseSchema.pick({ id: true });

// Types for messages - used to type API request params and within Components
export type Message = typeof messages.$inferSelect;
export type NewMessage = z.infer<typeof insertMessageSchema>;
export type NewMessageParams = z.infer<typeof insertMessageParams>;
export type UpdateMessageParams = z.infer<typeof updateMessageParams>;
export type MessageId = z.infer<typeof messageIdSchema>["id"];

// this type infers the return from getMessages() - meaning it will include any joins
export type CompleteMessage = Awaited<
	ReturnType<typeof getMessages>
>["messages"][number];
