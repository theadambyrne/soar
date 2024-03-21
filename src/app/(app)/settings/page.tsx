"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useTheme } from "next-themes";
import { useState, useEffect, Key } from "react";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { DownloadCloud } from "lucide-react";

// eslint-disable-next-line @next/next/no-async-client-component
export default async function Page() {
	const { setTheme } = useTheme();

	const [supportText, setSupportText] = useState("Submit");
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		const getMessages = async () => {
			const res = await fetch("https://soar-mauve.vercel.app/api/get-support");
			const data = await res.json();
			setMessages(data);
		};
		getMessages();
	}, []);

	return (
		<div>
			<h1 className="text-2xl font-semibold">Settings</h1>
			<div className="space-y-4 my-4">
				<div>
					<h3 className="text-lg font-medium">Support</h3>
					<p className="text-sm text-muted-foreground">
						Something not quite right? Contact support and upload related
						artefacts.
					</p>

					<form
						onSubmit={async (e) => {
							e.preventDefault();
							setSupportText("Uploading...");

							const formData = new FormData();
							formData.append(
								"file",
								(e.target as HTMLFormElement).file.files?.[0]!
							);
							formData.append(
								"message",
								(e.target as HTMLFormElement).message.value
							);
							const response = await fetch("/api/get-support", {
								method: "POST",
								body: formData,
							});

							const data = await response.json();
							toast.success("File uploaded to: " + data.res);

							await fetch("/api/messages", {
								method: "POST",
								body: JSON.stringify({
									content: (e.target as HTMLFormElement).message.value,
									filepath: data.res,
									userId: data.res.split("/")[0],
								}),
							});

							setSupportText("Submit");
							toast.success("Support ticket created");

							(e.target as HTMLFormElement).file.value = [];
							(e.target as HTMLFormElement).message.value = "";
						}}
						className="space-y-4 mt-4 p-4 rounded-md shadow-sm border border-muted-foreground dark:border-neutral-800 bg-white dark:bg-neutral-900 w-2/3"
					>
						<div className="grid items-center gap-4">
							<Label htmlFor="message">Message</Label>
							<Textarea
								placeholder="Message"
								name="message"
								id="message"
								required
							/>

							<Label htmlFor="file">Attach file</Label>
							<Input id="file" type="file" accept=".csv" required />
							<Button type="submit">{supportText}</Button>
						</div>
					</form>

					<div className="space-y-4 mt-4 p-4 rounded-md shadow-sm border border-muted-foreground dark:border-neutral-800 bg-white dark:bg-neutral-900 w-2/3">
						<h3 className="text-lg font-medium">Record of support</h3>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Created</TableHead>
									<TableHead>Message</TableHead>
									<TableHead>Artefact</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{messages.map(
									({
										createdAt,
										content,
										filepath,
									}: {
										createdAt: string;
										content: string;
										filepath: string;
									}) => (
										<TableRow key={createdAt}>
											<TableCell className="font-small">{createdAt}</TableCell>

											<TableCell className="font-small">{content}</TableCell>
											<TableCell className="font-small justify-center">
												<Link href={filepath}>
													<DownloadCloud className="text-blue-500" />
												</Link>
											</TableCell>
										</TableRow>
									)
								)}
							</TableBody>
						</Table>
					</div>
				</div>
				<div>
					<h3 className="text-lg font-medium">Appearance</h3>
					<p className="text-sm text-muted-foreground">
						Customize the appearance of the app. Automatically switch between
						day and night themes.
					</p>
				</div>
				<Button
					asChild
					variant={"ghost"}
					className="w-fit h-fit"
					onClick={() => setTheme("light")}
				>
					<div className="flex flex-col">
						<div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
							<div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
								<div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
									<div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
									<div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
								</div>
								<div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
									<div className="h-4 w-4 rounded-full bg-[#ecedef]" />
									<div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
								</div>
								<div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
									<div className="h-4 w-4 rounded-full bg-[#ecedef]" />
									<div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
								</div>
							</div>
						</div>
						<span className="block w-full p-2 text-center font-normal">
							Light
						</span>
					</div>
				</Button>
				<Button
					asChild
					variant={"ghost"}
					onClick={() => setTheme("dark")}
					className="w-fit h-fit"
				>
					<div className="flex flex-col">
						<div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
							<div className="space-y-2 rounded-sm bg-neutral-950 p-2">
								<div className="space-y-2 rounded-md bg-neutral-800 p-2 shadow-sm">
									<div className="h-2 w-[80px] rounded-lg bg-neutral-400" />
									<div className="h-2 w-[100px] rounded-lg bg-neutral-400" />
								</div>
								<div className="flex items-center space-x-2 rounded-md bg-neutral-800 p-2 shadow-sm">
									<div className="h-4 w-4 rounded-full bg-neutral-400" />
									<div className="h-2 w-[100px] rounded-lg bg-neutral-400" />
								</div>
								<div className="flex items-center space-x-2 rounded-md bg-neutral-800 p-2 shadow-sm">
									<div className="h-4 w-4 rounded-full bg-neutral-400" />
									<div className="h-2 w-[100px] rounded-lg bg-neutral-400" />
								</div>
							</div>
						</div>
						<span className="block w-full p-2 text-center font-normal">
							Dark
						</span>
					</div>
				</Button>
				<Button
					asChild
					variant={"ghost"}
					onClick={() => setTheme("system")}
					className="w-fit h-fit"
				>
					<div className="flex flex-col">
						<div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
							<div className="space-y-2 rounded-sm bg-neutral-300 p-2">
								<div className="space-y-2 rounded-md bg-neutral-600 p-2 shadow-sm">
									<div className="h-2 w-[80px] rounded-lg bg-neutral-400" />
									<div className="h-2 w-[100px] rounded-lg bg-neutral-400" />
								</div>
								<div className="flex items-center space-x-2 rounded-md bg-neutral-600 p-2 shadow-sm">
									<div className="h-4 w-4 rounded-full bg-neutral-400" />
									<div className="h-2 w-[100px] rounded-lg bg-neutral-400" />
								</div>
								<div className="flex items-center space-x-2 rounded-md bg-neutral-600 p-2 shadow-sm">
									<div className="h-4 w-4 rounded-full bg-neutral-400" />
									<div className="h-2 w-[100px] rounded-lg bg-neutral-400" />
								</div>
							</div>
						</div>
						<span className="block w-full p-2 text-center font-normal">
							System
						</span>
					</div>
				</Button>
			</div>
		</div>
	);
}
