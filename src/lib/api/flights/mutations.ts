import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  FlightId, 
  NewFlightParams,
  UpdateFlightParams, 
  updateFlightSchema,
  insertFlightSchema, 
  flights,
  flightIdSchema 
} from "@/lib/db/schema/flights";
import { getUserAuth } from "@/lib/auth/utils";

export const createFlight = async (flight: NewFlightParams) => {
  const { session } = await getUserAuth();
  const newFlight = insertFlightSchema.parse({ ...flight, userId: session?.user.id! });
  try {
    const [f] =  await db.insert(flights).values(newFlight).returning();
    return { flight: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateFlight = async (id: FlightId, flight: UpdateFlightParams) => {
  const { session } = await getUserAuth();
  const { id: flightId } = flightIdSchema.parse({ id });
  const newFlight = updateFlightSchema.parse({ ...flight, userId: session?.user.id! });
  try {
    const [f] =  await db
     .update(flights)
     .set(newFlight)
     .where(and(eq(flights.id, flightId!), eq(flights.userId, session?.user.id!)))
     .returning();
    return { flight: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteFlight = async (id: FlightId) => {
  const { session } = await getUserAuth();
  const { id: flightId } = flightIdSchema.parse({ id });
  try {
    const [f] =  await db.delete(flights).where(and(eq(flights.id, flightId!), eq(flights.userId, session?.user.id!)))
    .returning();
    return { flight: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

