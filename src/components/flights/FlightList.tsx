"use client";
import { CompleteFlight } from "@/lib/db/schema/flights";
import { trpc } from "@/lib/trpc/client";
import FlightModal from "./FlightModal";


export default function FlightList({ flights }: { flights: CompleteFlight[] }) {
  const { data: f } = trpc.flights.getFlights.useQuery(undefined, {
    initialData: { flights },
    refetchOnMount: false,
  });

  if (f.flights.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {f.flights.map((flight) => (
        <Flight flight={flight} key={flight.id} />
      ))}
    </ul>
  );
}

const Flight = ({ flight }: { flight: CompleteFlight }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{flight.recordedAt.toString()}</div>
      </div>
      <FlightModal flight={flight} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No flights
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new flight.
      </p>
      <div className="mt-6">
        <FlightModal emptyState={true} />
      </div>
    </div>
  );
};

