import { getFlightById, getFlights } from "@/lib/api/flights/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  flightIdSchema,
  insertFlightParams,
  updateFlightParams,
} from "@/lib/db/schema/flights";
import { createFlight, deleteFlight, updateFlight } from "@/lib/api/flights/mutations";

export const flightsRouter = router({
  getFlights: publicProcedure.query(async () => {
    return getFlights();
  }),
  getFlightById: publicProcedure.input(flightIdSchema).query(async ({ input }) => {
    return getFlightById(input.id);
  }),
  createFlight: publicProcedure
    .input(insertFlightParams)
    .mutation(async ({ input }) => {
      return createFlight(input);
    }),
  updateFlight: publicProcedure
    .input(updateFlightParams)
    .mutation(async ({ input }) => {
      return updateFlight(input.id, input);
    }),
  deleteFlight: publicProcedure
    .input(flightIdSchema)
    .mutation(async ({ input }) => {
      return deleteFlight(input.id);
    }),
});
