import { router } from "@/lib/server/trpc";
import { flightsRouter } from "./flights";
import { devicesRouter } from "./devices";

export const appRouter = router({
	flights: flightsRouter,
	devices: devicesRouter,
});

export type AppRouter = typeof appRouter;
