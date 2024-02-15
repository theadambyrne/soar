import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type DeviceId, deviceIdSchema, devices } from "@/lib/db/schema/devices";

export const getDevices = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(devices).where(eq(devices.userId, session?.user.id!));
  const d = rows
  return { devices: d };
};

export const getDeviceById = async (id: DeviceId) => {
  const { session } = await getUserAuth();
  const { id: deviceId } = deviceIdSchema.parse({ id });
  const [row] = await db.select().from(devices).where(and(eq(devices.id, deviceId), eq(devices.userId, session?.user.id!)));
  if (row === undefined) return {};
  const d = row;
  return { device: d };
};


