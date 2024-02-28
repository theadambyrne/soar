import Link from "next/link";
import Image from "next/image";
import { Send, Footprints } from "lucide-react";
import { getUserAuth } from "@/lib/auth/utils";

import SignOutLink from "@/components/auth/SignOutLink";

export default async function Component() {
	const session = await getUserAuth();

	return (
		<div className="flex min-h-screen flex-col">
			<header className="flex h-20 items-center px-4 lg:px-6">
				<Link className="flex items-center justify-center" href="/">
					<Send className="h-6 w-6" />
					<span className="ml-4 text-2xl font-semibold">Soar</span>
				</Link>
				<nav className="ml-auto flex gap-4 sm:gap-6">
					{session.session ? (
						<>
							<Link
								className="text-lg font-medium underline-offset-4 hover:underline"
								href="/dashboard"
							>
								Dashboard
							</Link>
							<SignOutLink />
						</>
					) : (
						<>
							<Link
								className="text-lg font-medium underline-offset-4 hover:underline"
								href="/sign-in"
							>
								Sign In
							</Link>
							<Link
								className="text-lg font-medium underline-offset-4 hover:underline"
								href="/sign-up"
							>
								Sign Up
							</Link>
						</>
					)}
				</nav>
			</header>
			<main className="flex-1">
				<section className="w-full py-6 sm:py-12 md:py-24 lg:py-32 xl:py-48">
					<div className="container px-4 md:px-6">
						<div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
							<Image
								src="/map.svg"
								alt="Map sketch"
								width={300}
								height={300}
								className="mx-auto aspect-video overflow-hidden rounded-xl object-fill sm:w-full lg:order-last lg:aspect-square dark:invert p-20"
							/>
							<div className="flex flex-col space-y-4">
								<div className="space-y-2">
									<h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none flex">
										<Footprints size={64} className="mr-3" />
										Roadmap
									</h1>
									<p className="max-w-[700px] text-neutral-600 md:text-xl dark:text-neutral-400 py-4">
										Follow the growth of Soar and see what&apos;s coming next.
										We are excited to show our process and how we are building
										the future of flight electronics.
									</p>

									<ol className="space-y-4 pt-2">
										<li>
											<p className="text-lg font-semibold">Cycle 1 - MVP</p>
											<p className="text-neutral-500 dark:text-neutral-400">
												Soar began from a college project to create a cloud
												first HCI device. At Soar our MVP is a Flight Computer
												with a Live Cloud Dashboard. Removing the need for a
												ground station with a cloud centric approach.
											</p>
										</li>
										<li>
											<p className="text-lg font-semibold">The Future</p>
											<p className="text-neutral-500 dark:text-neutral-400">
												Soar will expand its R&D efforts specifically in the
												Computer Vision space to deliver Soar&apos;s 2nd
												product.
											</p>
										</li>
									</ol>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className="w-full border-t py-12 md:py-24 lg:py-32">
					<div className="container px-4 md:px-6">
						<div className="flex flex-col items-center justify-center space-y-4 text-center">
							<div className="space-y-2">
								<h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
									Sign Up for Updates
								</h2>
								<p className="max-w-[600px] text-neutral-500 md:text-xl dark:text-neutral-400">
									Stay updated with the latest product news and updates.
								</p>
							</div>
							<div className="w-full max-w-sm space-y-2">
								<form className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
									<input
										className="border-border max-w-lg flex-1 rounded-md border px-4 py-2 "
										placeholder="Enter your email"
										type="email"
									/>
									<button
										type="submit"
										className="inline-flex h-10 items-center justify-center rounded-md bg-neutral-900 px-4 text-sm font-medium text-neutral-50 shadow transition-colors hover:bg-neutral-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90 dark:focus-visible:ring-neutral-300"
									>
										Sign Up
									</button>
								</form>
							</div>
						</div>
					</div>
				</section>
			</main>
			<footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
				<p className="text-xs text-neutral-500 dark:text-neutral-400">
					© 2024 Soar Inc. All rights reserved.
				</p>
				<nav className="flex gap-4 sm:ml-auto sm:gap-6">
					<Link className="text-xs underline-offset-4 hover:underline" href="#">
						Terms of Service
					</Link>
					<Link className="text-xs underline-offset-4 hover:underline" href="#">
						Privacy
					</Link>
				</nav>
			</footer>
		</div>
	);
}
