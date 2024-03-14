import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  BannerId, 
  NewBannerParams,
  UpdateBannerParams, 
  updateBannerSchema,
  insertBannerSchema, 
  banners,
  bannerIdSchema 
} from "@/lib/db/schema/banners";

export const createBanner = async (banner: NewBannerParams) => {
  const newBanner = insertBannerSchema.parse(banner);
  try {
    const [b] =  await db.insert(banners).values(newBanner).returning();
    return { banner: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateBanner = async (id: BannerId, banner: UpdateBannerParams) => {
  const { id: bannerId } = bannerIdSchema.parse({ id });
  const newBanner = updateBannerSchema.parse(banner);
  try {
    const [b] =  await db
     .update(banners)
     .set({...newBanner, updatedAt: new Date().toISOString().slice(0, 19).replace("T", " ") })
     .where(eq(banners.id, bannerId!))
     .returning();
    return { banner: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteBanner = async (id: BannerId) => {
  const { id: bannerId } = bannerIdSchema.parse({ id });
  try {
    const [b] =  await db.delete(banners).where(eq(banners.id, bannerId!))
    .returning();
    return { banner: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

