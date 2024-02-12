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

export default async function Home() {
	return (
		<main className="">
			<h1 className="text-3xl font-semibold my-2">Dashboard</h1>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-20 wrap-cols">
				<Card>
					<div id="body" className="p-4">
						<div className="flex items-center">
							<Radio className="mr-2" />
							<h3 className="text-2xl font-semibold">Live</h3>
						</div>
						<p className="text-muted-foreground">
							Craft to Cloud live streaming (Last updated 12s ago)
						</p>

						<div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-center">
							<div className="p-8">
								<h3 className="text-2xl font-semibold">Altitude</h3>
								<p className="text-6xl font-bold mt-2">
									220 <span className="text-xl font-medium -ml-3">km</span>
								</p>
							</div>
							<div className="p-8">
								<h3 className="text-2xl font-semibold">Speed</h3>
								<p className="text-6xl font-bold mt-2">
									800<span className="text-xl font-medium ml-1">km/hr</span>
								</p>
							</div>
							<div className="p-8">
								<h3 className="text-2xl font-semibold">Displacement</h3>
								<p className="text-5xl font-semibold mt-2">8:2</p>
							</div>
							<div className="p-8">
								<h3 className="text-2xl font-semibold">Device</h3>
								<p className="text-3xl font-bold mt-2">SR-0003 FC1</p>
							</div>
						</div>
					</div>
				</Card>
				<Card>
					<div id="body" className="p-4 ">
						<h3 className="text-2xl font-semibold">Devices</h3>
						<Table className="px-4  mt-2">
							<TableCaption>Devices connected to this account</TableCaption>
							<TableHeader>
								<TableRow>
									<TableHead className="w-[100px]">#</TableHead>
									<TableHead>Model</TableHead>
									<TableHead>Last used</TableHead>
									<TableHead>Status</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								<TableRow>
									<TableCell className="font-medium">SR-0003</TableCell>
									<TableCell>Soar FC1</TableCell>
									<TableCell>12th April 2024</TableCell>
									<TableCell>
										<div className="inline-block rounded-lg bg-green-600 px-3 py-1 text-sm text-white">
											Live
										</div>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell className="font-medium">SR-0002</TableCell>
									<TableCell>Soar FC1 (demo)</TableCell>
									<TableCell>12th March 2024</TableCell>
									<TableCell>
										<div className="inline-block rounded-lg bg-blue-400 px-3 py-1 text-sm text-white">
											Idle
										</div>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell className="font-medium">SR-0001</TableCell>
									<TableCell>Soar FC1 (prototype)</TableCell>
									<TableCell>12th February 2024</TableCell>
									<TableCell>
										<div className="inline-block rounded-lg bg-gray-600 px-3 py-1 text-sm text-white">
											Unknown
										</div>
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</div>
				</Card>
			</div>
		</main>
	);
}
