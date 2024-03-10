/**
 * v0 by Vercel.
 * @see https://v0.dev/t/PmwTvNfrVgf
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";
import Image from "next/image";
import { Send, Network, Zap, CircuitBoard, Construction } from "lucide-react";
import { getUserAuth } from "@/lib/auth/utils";

import SignOutLink from "@/components/auth/SignOutLink";

export default async function Component() {
	const session = await getUserAuth();

	return (
		<div className="flex min-h-screen flex-col">
			<header className="flex h-20 items-center px-4 lg:px-6">
				<Link className="flex items-center justify-center" href="#">
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
								src="/shuttle.svg"
								alt="Space shuttle wireframe"
								width={400}
								height={400}
								className="mx-auto aspect-video overflow-hidden rounded-xl object-fill sm:w-full lg:order-last lg:aspect-square dark:invert"
							/>
							<div className="flex flex-col justify-center space-y-4">
								<div className="space-y-2">
									<h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
										Craft to Cloud <br />
										for all things flight
									</h1>
									<p className="max-w-[600px] text-neutral-500 md:text-xl dark:text-neutral-400 py-4">
										Develop your next big idea for Drones, Low flying aircraft,
										and High powered rockets by prototyping and testing on Soar.
									</p>
								</div>
								<div className="flex flex-col gap-2 min-[400px]:flex-row">
									<Link
										className="inline-flex h-10 items-center justify-center rounded-md bg-neutral-900 px-8 text-sm font-medium text-neutral-50 shadow transition-colors hover:bg-neutral-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90 dark:focus-visible:ring-neutral-300"
										href="/sign-up"
									>
										Get Started
									</Link>

									<Link
										className="flex items-center gap-2 text-neutral-500 hover:text-neutral-600 dark:text-neutral-400 dark:hover:text-neutral-300 ml-5"
										href="/roadmap"
									>
										<Construction size={24} />
										<span>Follow our roadmap</span>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section id="products" className="w-full mt-20">
					<div className="container px-4 md:px-6">
						<div className="flex flex-col items-center justify-center space-y-4 text-center">
							<div className="space-y-2">
								<div className="inline-block rounded-lg bg-neutral-100 px-3 py-1 text-sm dark:bg-neutral-800">
									Coming soon
								</div>
								<h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
									Blackbox 1
								</h2>
								<p className="max-w-[900px] text-neutral-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-neutral-400">
									Blackbox for drone flight, low flying aircraft, and model
									rockets. The device records motion data in flight and on
									retrieval sends the data to your Soar Dashboard.
								</p>
							</div>
						</div>
						<div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-10">
							<Image
								src="/blackbox.png"
								alt="Blackbox"
								width={500}
								height={500}
								className="mx-auto rounded-xl sm:w-full lg:order-last dark:bg-neutral-900"
							/>
							<div className="flex flex-col justify-center space-y-4">
								<ul className="grid gap-6">
									<li>
										<div className="grid gap-1">
											<div className="flex items-center">
												<CircuitBoard className="mr-3 h-8 w-8" />
												<h3 className="text-xl font-bold">Sensors</h3>
											</div>

											<ul className="text-neutral-500 dark:text-neutral-400 space-y-2 mt-1">
												<li>
													<u>IMU</u> 6 DOF - 3 axis accelerometer and 3 axis
													gyroscope
												</li>
												<li>
													<u>Barometer</u> pressure sensor and altimeter
												</li>
												<li>
													<u>GPS</u> GLONASS sensor for location tracking
												</li>
											</ul>
										</div>
									</li>
									<li>
										<div className="grid gap-1">
											<div className="flex items-center">
												<Network className="mr-3 h-8 w-8" />
												<h3 className="text-xl font-bold">Communication</h3>
											</div>
											<p className="text-neutral-500 dark:text-neutral-400 mt-1">
												You can use a normal network or a phone hotspot via a
												2.4GHz Wi-Fi module to connect to the cloud
											</p>
										</div>
									</li>
									<li>
										<div className="grid gap-1">
											<div className="flex items-center">
												<Zap className="mr-3 h-8 w-8" />
												<h3 className="text-xl font-bold">Power</h3>
											</div>
											<p className="text-neutral-500 dark:text-neutral-400 mt-1">
												A 1000mAh LiPo battery powers the Blackbox for 2 hours.
												You can also use a powerbank to extend the flight time
											</p>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</section>

				<section id="products" className="w-full mt-20">
					<div className="container px-4 md:px-6">
						<div className="flex flex-col items-center justify-center space-y-4 text-center">
							<div className="space-y-2">
								<h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
									Your Dashboard
								</h2>
								<p className="max-w-[900px] text-neutral-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-neutral-400">
									Manage your devices, flight data and more from your Soar
									Dashboard powered by our Craft to Cloud technology. Get
									meaningful visual insights and access to your raw data as
									recorded.
								</p>
							</div>
						</div>
						<div className="flex flex-col justify-center space-y-4">
							<Image
								src="/dash.jpeg"
								alt="Dashboard"
								width={600}
								height={400}
								className="mx-auto rounded-xl sm:w-full lg:order-last dark:bg-neutral-900 m-10"
							/>
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
