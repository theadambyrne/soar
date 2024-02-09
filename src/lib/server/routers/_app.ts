import { computersRouter } from "./computers";
import { router } from "@/lib/server/trpc";
import { flightsRouter } from "./flights";

export const appRouter = router({
  computers: computersRouter,
  flights: flightsRouter,
});

export type AppRouter = typeof appRouter;
