import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Radio } from "lucide-react";

import { getDevices } from "@/lib/api/devices/queries";
export default async function Home() {
  const { devices } = await getDevices();

  return (
		<main className="">
			<h1 className="my-2 text-3xl font-semibold">Dashboard</h1>

			<div className="wrap-cols my-20 grid grid-cols-1 gap-4 lg:grid-cols-2">
				<Card>
					<div id="body" className="p-4">
						<div className="flex items-center">
							<Radio className="mr-2" />
							<h3 className="text-2xl font-semibold">Live</h3>
						</div>
						<p className="text-muted-foreground">
							Craft to Cloud live streaming (Last updated 12s ago)
						</p>

						<div className="grid grid-cols-1 items-center justify-center lg:grid-cols-2">
							<div className="p-8">
								<h3 className="text-2xl font-semibold">Altitude</h3>
								<p className="mt-2 text-6xl font-bold">
									220 <span className="-ml-3 text-xl font-medium">km</span>
								</p>
							</div>
							<div className="p-8">
								<h3 className="text-2xl font-semibold">Speed</h3>
								<p className="mt-2 text-6xl font-bold">
									800<span className="ml-1 text-xl font-medium">km/hr</span>
								</p>
							</div>
							<div className="p-8">
								<h3 className="text-2xl font-semibold">Displacement</h3>
								<p className="mt-2 text-5xl font-semibold">8:2</p>
							</div>
							<div className="p-8">
								<h3 className="text-2xl font-semibold">Device</h3>
								<p className="mt-2 text-3xl font-bold">SR-BB000001</p>
							</div>
						</div>
					</div>
				</Card>
				<Card>
					<div id="body" className="p-4 ">
						<h3 className="text-2xl font-semibold">Devices</h3>
						<Table className="mt-2  px-4">
							<TableCaption>Devices connected to this account</TableCaption>
							<TableHeader>
								<TableRow>
									<TableHead className="w-[100px]">#</TableHead>
									<TableHead>Model</TableHead>
									<TableHead>Created At</TableHead>
									<TableHead>Status</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{devices.map((device) => (
									<TableRow key={device.id}>
										<TableCell className="font-medium">
											{device.serial}
										</TableCell>
										<TableCell>{device.name}</TableCell>
										<TableCell>{device.createdAt}</TableCell>
										<TableCell>
											{new Date(device.updatedAt).getTime() <
											Date.now() - 300000 ? (
												<div className="inline-block rounded-lg bg-green-500 px-3 py-1 text-sm text-white">
													Online
												</div>
											) : (
												<div className="inline-block rounded-lg bg-red-500 px-3 py-1 text-sm text-white">
													Offline
												</div>
											)}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				</Card>
			</div>
		</main>
	);
}
