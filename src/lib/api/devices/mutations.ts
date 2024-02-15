import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  DeviceId, 
  NewDeviceParams,
  UpdateDeviceParams, 
  updateDeviceSchema,
  insertDeviceSchema, 
  devices,
  deviceIdSchema 
} from "@/lib/db/schema/devices";
import { getUserAuth } from "@/lib/auth/utils";

export const createDevice = async (device: NewDeviceParams) => {
  const { session } = await getUserAuth();
  const newDevice = insertDeviceSchema.parse({ ...device, userId: session?.user.id! });
  try {
    const [d] =  await db.insert(devices).values(newDevice).returning();
    return { device: d };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateDevice = async (id: DeviceId, device: UpdateDeviceParams) => {
  const { session } = await getUserAuth();
  const { id: deviceId } = deviceIdSchema.parse({ id });
  const newDevice = updateDeviceSchema.parse({ ...device, userId: session?.user.id! });
  try {
    const [d] =  await db
     .update(devices)
     .set({...newDevice, updatedAt: new Date().toISOString().slice(0, 19).replace("T", " ") })
     .where(and(eq(devices.id, deviceId!), eq(devices.userId, session?.user.id!)))
     .returning();
    return { device: d };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteDevice = async (id: DeviceId) => {
  const { session } = await getUserAuth();
  const { id: deviceId } = deviceIdSchema.parse({ id });
  try {
    const [d] =  await db.delete(devices).where(and(eq(devices.id, deviceId!), eq(devices.userId, session?.user.id!)))
    .returning();
    return { device: d };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

