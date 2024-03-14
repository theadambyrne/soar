import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { checkAdmin } from "@/lib/auth/utils";

import { Activity, DownloadCloud, Users, CircleFadingPlus } from "lucide-react";
import Link from "next/link";
import { Key } from "react";
import { getBaseUrl } from "@/lib/trpc/utils";

export default async function Home() {
	await checkAdmin();
	const host = getBaseUrl();

	const { userCount, flightCount, messagesTW, messages, admins } = await fetch(
		`${host}/api/admin`
	).then((res) => res.json());

	// messages.messages.sort((a: any, b: any) => {
	// 	const dateA = new Date(a.createdAt);
	// 	const dateB = new Date(b.createdAt);
	// 	return dateB.getTime() - dateA.getTime();
	// });

	return (
		<main>
			<h1 className="text-3xl font-semibold my-2">Admin</h1>

			<div className="grid grid-cols-2 gap-4 my-10 wrap-cols">
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
							<Users className="mr-2" />
							<h3 className="text-2xl font-semibold">Manage users</h3>
						</div>

						<div className="grid grid-cols-2 gap-4 mt-8">
							<form action={`${host}/api/admin/add`} method="POST">
								<label htmlFor="email" className="block mt-4 w-full">
									Email
									<Input type="email" name="email" id="email" />
								</label>

								<Button type="submit" className="block mt-4 w-full">
									Grant admin access
								</Button>
							</form>
							<form action={`${host}/api/admin/remove`} method="POST">
								<label htmlFor="adminEmail" className="block mt-4 w-full">
									User
									<Select name="email">
										<SelectTrigger>
											<SelectValue placeholder="Admin" />
										</SelectTrigger>
										<SelectContent>
											{admins.map((admin: any, key: Key) => (
												<SelectItem key={key} value={admin.email}>
													{admin.email}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</label>

								<Button
									type="submit"
									className="block mt-4 w-full bg-red-500 hover:bg-red-700"
								>
									Revoke admin access
								</Button>
							</form>
						</div>
					</div>
				</Card>

				<Card>
					<div id="body" className="p-4">
						<div className="flex items-center">
							<CircleFadingPlus className="mr-2" />
							<h3 className="text-2xl font-semibold">CMS</h3>
						</div>

						<form action={`${host}/api/banners`} method="POST">
							<label htmlFor="title" className="block mt-4 w-full">
								Title
								<Input type="text" name="title" id="title" required />
							</label>

							<label htmlFor="content" className="block mt-4 w-full">
								Content
								<Input type="text" name="content" id="content" required />
							</label>

							<label htmlFor="color" className="block mt-4 w-full">
								Banner Colour
								<Input type="color" name="color" id="color" required />
							</label>

							<Button type="submit" className="block mt-4 w-full">
								Update
							</Button>
						</form>
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
