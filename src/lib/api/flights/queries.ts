import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type FlightId, flightIdSchema, flights } from "@/lib/db/schema/flights";

export const getFlights = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(flights).where(eq(flights.userId, session?.user.id!));
  const f = rows
  return { flights: f };
};

export const getFlightById = async (id: FlightId) => {
  const { session } = await getUserAuth();
  const { id: flightId } = flightIdSchema.parse({ id });
  const [row] = await db.select().from(flights).where(and(eq(flights.id, flightId), eq(flights.userId, session?.user.id!)));
  if (row === undefined) return {};
  const f = row;
  return { flight: f };
};


