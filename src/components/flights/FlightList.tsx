"use client";
import { CompleteFlight } from "@/lib/db/schema/flights";
import { trpc } from "@/lib/trpc/client";
import FlightModal from "./FlightModal";
import { Device, devices } from "@/lib/db/schema/devices";

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
	const { data: devices } =
		trpc.devices.getDevices.useQuery(undefined, {
			refetchOnMount: false,
		}) ?? ({ devices: [] } as { devices: Device[] });

	return (
		<li className="flex justify-between my-2">
			<div className="w-full">
				<h3 className="font-semibold text-lg">
					{flight.recordedAt.toTimeString().substring(0, 5) +
						" " +
						flight.recordedAt.toDateString()}
				</h3>
				{devices === undefined ? (
					<p className="text-sm text-muted-foreground">Loading...</p>
				) : (
					<p className="text-sm text-muted-foreground">
						{devices.devices.find((d) => flight.deviceId === d.id)?.name} -{" "}
						{flight.data}
					</p>
				)}
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
				You can record live or upload a flight here.
			</p>
			<div className="mt-6">
				<FlightModal emptyState={true} />
			</div>
		</div>
	);
};
