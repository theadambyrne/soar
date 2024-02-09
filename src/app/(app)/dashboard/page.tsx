import AuthForm from "@/components/auth/Form";
import { Card } from "@/components/ui/card";

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

						<div className="grid grid-cols-1 lg:grid-cols-2">
							<div className="p-8">
								<h3 className="text-2xl font-semibold">Altitude</h3>
								<p className="text-6xl font-bold px-4  mt-2">
									220 <span className="text-xl font-medium -ml-3">km</span>
								</p>
							</div>
							<div className="p-8">
								<h3 className="text-2xl font-semibold">Speed</h3>
								<p className="text-6xl font-bold px-4  mt-2">
									800<span className="text-xl font-medium ml-1">km/hr</span>
								</p>
							</div>
							<div className="p-8">
								<h3 className="text-2xl font-semibold">Displacement ratio</h3>
								<p className="text-6xl font-bold px-4  mt-2">8:2</p>
							</div>
							<div className="p-8">
								<h3 className="text-2xl font-semibold">Computer</h3>
								<p className="text-3xl font-bold mt-2">Soar FC1</p>
							</div>
						</div>
					</div>
				</Card>
				<Card>
					<div id="body" className="p-4 ">
						<h3 className="text-2xl font-semibold">Flights</h3>
						<p className="text-6xl font-bold">1</p>
						Flight(s) this year
					</div>
				</Card>
				<Card>
					<div id="body" className="p-4 ">
						<h3 className="text-2xl font-semibold">Live</h3>
						<p className="text-muted-foreground">
							Active flight data as it happens
						</p>
					</div>
				</Card>
			</div>

			<AuthForm action="/api/sign-out" />
		</main>
	);
}
