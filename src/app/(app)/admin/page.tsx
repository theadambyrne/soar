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

import { checkAdmin } from "@/lib/auth/utils";

import { Users, RadioReceiver, Activity } from "lucide-react";

type Activity = {
	timestamp: Date;
	user: string; // user_id
	action: string;
	status: boolean;
};

export default async function Home() {
	await checkAdmin();

	const userCount = 11;
	const adminCount = 1;
	const liveCount = 2;
	const deviceCount = 7;

	const activityList: Activity[] = [
		{
			timestamp: new Date(),
			user: "user123",
			action: "Logged in",
			status: true,
		},
		{
			timestamp: new Date(),
			user: "user456",
			action: "Connect device",
			status: true,
		},
		{
			timestamp: new Date(),
			user: "user789",
			action: "Exported flight logs",
			status: false,
		},
	];

	return (
		<main className="">
			<h1 className="text-3xl font-semibold my-2">Admin</h1>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-20 wrap-cols">
				<Card>
					<div id="body" className="p-4">
						<div className="flex items-center">
							<Users className="mr-2" />
							<h3 className="text-2xl font-semibold">Users</h3>
						</div>

						<div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-center">
							<div className="p-8">
								<h3 className="text-2xl font-semibold">Total</h3>
								<p className="text-6xl font-bold mt-2">{userCount}</p>
							</div>
							<div className="p-8">
								<h3 className="text-2xl font-semibold">Admins</h3>
								<p className="text-6xl font-bold mt-2">{adminCount}</p>
							</div>
						</div>
					</div>
				</Card>
				<Card>
					<div id="body" className="p-4">
						<div className="flex items-center">
							<RadioReceiver className="mr-2" />
							<h3 className="text-2xl font-semibold">Devices</h3>
						</div>

						<div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-center">
							<div className="p-8">
								<h3 className="text-2xl font-semibold">Live</h3>
								<p className="text-6xl font-bold mt-2">{liveCount}</p>
							</div>
							<div className="p-8">
								<h3 className="text-2xl font-semibold">Connected</h3>
								<p className="text-6xl font-bold mt-2">{deviceCount}</p>
							</div>
						</div>
					</div>
				</Card>
				<Card>
					<div id="body" className="p-4">
						<div className="flex items-center">
							<Activity className="mr-2" />
							<h3 className="text-2xl font-semibold">Activity</h3>
						</div>

						<Table className="mt-8">
							<TableHeader>
								<TableRow>
									<TableHead className="w-[100px]">Timestamp</TableHead>
									<TableHead>User</TableHead>
									<TableHead>Action</TableHead>
									<TableHead className="text-right">Status</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{activityList.map((activity) => (
									<TableRow>
										<TableCell className="font-small">
											{activity.timestamp.toLocaleDateString() +
												" " +
												activity.timestamp.toLocaleTimeString()}
										</TableCell>
										<TableCell>{activity.user}</TableCell>
										<TableCell>{activity.action}</TableCell>
										<TableCell className="flex justify-end">
											{activity.status ? (
												<div className="w-6 h-6 rounded-full bg-green-500"></div>
											) : (
												<div className="w-6 h-6 rounded-full bg-red-500"></div>
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
