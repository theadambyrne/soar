import { getDevices } from "@/lib/api/devices/queries";
import { getFlights } from "@/lib/api/flights/queries";
import {
	PlaneIcon,
	Radio,
	MessageCircleQuestion,
	MessageSquareShare,
} from "lucide-react";

import Link from "next/link";

export default async function Home() {
	const devices = await getDevices();
	const deviceCount = devices.devices.length;

	const flights = await getFlights();
	const flightCount = flights.flights.length;

	return (
		<main className="">
			<h1 className="my-2 text-3xl font-semibold">Dashboard</h1>

			<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-start">
				<div className="w-3 h-3 rounded-full bg-green-500" />
				<h3 className="text-sm">system active</h3>
			</div>

			<div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 mx-10">
				<Link href="/flights">
					<div className="border rounded-md w-full p-8 mx-auto flex flex-col items-center justify-center hover:scale-105 transition-scale duration-200 ">
						<PlaneIcon size={128} className="p-4" />
						<h2 className="text-5xl font-semibold mt-5">
							Flights ({flightCount})
						</h2>
					</div>
				</Link>
				<Link href="/devices">
					<div className="border rounded-md w-full p-8 mx-auto flex flex-col items-center justify-center hover:scale-105 transition-scale duration-200 ">
						<Radio size={128} className="p-4" />
						<h2 className="text-5xl font-semibold mt-5">
							Devices ({deviceCount})
						</h2>
					</div>
				</Link>
				<Link href="/settgins">
					<div className="border rounded-md w-full p-8 mx-auto flex flex-col items-center justify-center hover:scale-105 transition-scale duration-200 ">
						<MessageCircleQuestion size={128} className="p-4" />
						<h2 className="text-5xl font-semibold mt-5">Support</h2>
					</div>
				</Link>
				<Link href="/">
					<div className="border rounded-md w-full p-8 mx-auto flex flex-col items-center justify-center hover:scale-105 transition-scale duration-200 ">
						<MessageSquareShare size={128} className="p-4" />
						<h2 className="text-5xl font-semibold mt-5">Refer a friend</h2>
					</div>
				</Link>
			</div>
		</main>
	);
}
