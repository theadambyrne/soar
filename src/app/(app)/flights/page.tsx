import FlightList from "@/components/flights/FlightList";
import NewFlightModal from "@/components/flights/FlightModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function Flights() {
  await checkAuth();
  const { flights } = await api.flights.getFlights.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Flights</h1>
        <NewFlightModal />
      </div>
      <FlightList flights={flights} />
    </main>
  );
}
