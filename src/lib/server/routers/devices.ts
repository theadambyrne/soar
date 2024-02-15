import { getDeviceById, getDevices } from "@/lib/api/devices/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  deviceIdSchema,
  insertDeviceParams,
  updateDeviceParams,
} from "@/lib/db/schema/devices";
import { createDevice, deleteDevice, updateDevice } from "@/lib/api/devices/mutations";

export const devicesRouter = router({
  getDevices: publicProcedure.query(async () => {
    return getDevices();
  }),
  getDeviceById: publicProcedure.input(deviceIdSchema).query(async ({ input }) => {
    return getDeviceById(input.id);
  }),
  createDevice: publicProcedure
    .input(insertDeviceParams)
    .mutation(async ({ input }) => {
      return createDevice(input);
    }),
  updateDevice: publicProcedure
    .input(updateDeviceParams)
    .mutation(async ({ input }) => {
      return updateDevice(input.id, input);
    }),
  deleteDevice: publicProcedure
    .input(deviceIdSchema)
    .mutation(async ({ input }) => {
      return deleteDevice(input.id);
    }),
});
