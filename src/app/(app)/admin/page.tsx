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

import { Activity, DownloadCloud } from "lucide-react";
import Link from "next/link";
import { Key } from "react";

export default async function Home() {
	await checkAdmin();

	const { userCount, flightCount, messagesTW, messages } = await fetch(
		"http://localhost:3000/api/admin"
	).then((res) => res.json());

	messages.messages.sort((a: any, b: any) => {
		const dateA = new Date(a.createdAt);
		const dateB = new Date(b.createdAt);
		return dateB.getTime() - dateA.getTime();
	});

	return (
		<main className="">
			<h1 className="text-3xl font-semibold my-2">Admin</h1>

			<div className="grid grid-cols-1 gap-4 my-10 wrap-cols">
				<Card>
					<div id="body" className="p-4">
						<div className="flex items-center">
							<Activity className="mr-2" />
							<h3 className="text-2xl font-semibold">Activity</h3>
						</div>

						<div className="grid grid-cols-3  items-center justify-center">
							<div className="p-8">
								<h3 className="text-2xl font-semibold">Users</h3>
								<p className="text-6xl font-bold mt-2">{userCount}</p>
							</div>
							<div className="p-8">
								<h3 className="text-2xl font-semibold">Flights</h3>
								<p className="text-6xl font-bold mt-2">{flightCount}</p>
							</div>
							<div className="p-8">
								<h3 className="text-2xl font-semibold">
									Support (last 7 days)
								</h3>
								<p className="text-6xl font-bold mt-2">{messagesTW}</p>
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
									<TableHead>Action</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{messages.messages.map(
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
											<TableCell className="font-small flex flex-row justify-center items-center space-x-4">
												<Link href={ticket.filepath}>
													<DownloadCloud className="text-blue-500" />
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
