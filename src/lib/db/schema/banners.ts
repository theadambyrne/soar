import { sql } from "drizzle-orm";
import { text, sqliteTable, uniqueIndex } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getBanners } from "@/lib/api/banners/queries";

import { nanoid, timestamps } from "@/lib/utils";


export const banners = sqliteTable('banners', {
  id: text("id").primaryKey().$defaultFn(() => nanoid()),
  title: text("title").notNull(),
  content: text("content").notNull(),
  color: text("color").notNull(),
  
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),

}, (banners) => {
  return {
    titleIndex: uniqueIndex('title_idx').on(banners.title),
  }
});


// Schema for banners - used to validate API requests
const baseSchema = createSelectSchema(banners).omit(timestamps)

export const insertBannerSchema = createInsertSchema(banners).omit(timestamps);
export const insertBannerParams = baseSchema.extend({}).omit({ 
  id: true
});

export const updateBannerSchema = baseSchema;
export const updateBannerParams = baseSchema.extend({})
export const bannerIdSchema = baseSchema.pick({ id: true });

// Types for banners - used to type API request params and within Components
export type Banner = typeof banners.$inferSelect;
export type NewBanner = z.infer<typeof insertBannerSchema>;
export type NewBannerParams = z.infer<typeof insertBannerParams>;
export type UpdateBannerParams = z.infer<typeof updateBannerParams>;
export type BannerId = z.infer<typeof bannerIdSchema>["id"];
    
// this type infers the return from getBanners() - meaning it will include any joins
export type CompleteBanner = Awaited<ReturnType<typeof getBanners>>["banners"][number];

