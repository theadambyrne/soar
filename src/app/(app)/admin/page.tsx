import { Card } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import { checkAdmin } from "@/lib/auth/utils";

import { Users, RadioReceiver, Activity, DownloadCloud } from "lucide-react";
import Link from "next/link";
import { Key } from "react";

export default async function Home() {
	await checkAdmin();
	const tickets = await fetch("http://localhost:3000/api/messages").then(
		(res) => res.json()
	);

	tickets.messages.sort((a: any, b: any) => { 
		const dateA = new Date(a.createdAt);
		const dateB = new Date(b.createdAt);
		return dateB.getTime() - dateA.getTime();
	});

	const userCount = 11;
	const adminCount = 1;
	const liveCount = 2;
	const deviceCount = 7;

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
							<h3 className="text-2xl font-semibold">Support</h3>
						</div>

						<Table className="mt-8">
							<TableHeader>
								<TableRow>
									<TableHead>Created</TableHead>
									<TableHead>User</TableHead>
									<TableHead>Message</TableHead>
									<TableHead>Artefact</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{tickets.messages.map(
									(
										ticket: {
											createdAt: string;
											userId: string;
											content: string;
											filepath: string;
										},
										key: Key
									) => (
										<TableRow key={key}>
											<TableCell className="font-small">
												{ticket.createdAt}
											</TableCell>
											<TableCell className="font-small">
												{ticket.userId}
											</TableCell>
											<TableCell className="font-small">
												{ticket.content}
											</TableCell>
											<TableCell className="font-small">
												<Link href={ticket.filepath}>
													<DownloadCloud />
												</Link>
											</TableCell>
										</TableRow>
									)
								)}
							</TableBody>
						</Table>
					</div>
				</Card>
			</div>
		</main>
	);
}
