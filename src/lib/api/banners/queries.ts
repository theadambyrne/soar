import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type BannerId, bannerIdSchema, banners } from "@/lib/db/schema/banners";

export const getBanners = async () => {
  const rows = await db.select().from(banners);
  const b = rows
  return { banners: b };
};

export const getBannerById = async (id: BannerId) => {
  const { id: bannerId } = bannerIdSchema.parse({ id });
  const [row] = await db.select().from(banners).where(eq(banners.id, bannerId));
  if (row === undefined) return {};
  const b = row;
  return { banner: b };
};


