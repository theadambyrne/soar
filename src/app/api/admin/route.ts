import { allMessages } from "@/lib/api/messages/queries";
import { db } from "@/lib/db/index";
import { users } from "@/lib/db/schema/auth";
import { flights } from "@/lib/db/schema/flights";
import { auth } from "@/lib/auth/lucia";
import * as context from "next/headers";

export async function GET(request: Request) {
	const authRequest = auth.handleRequest(request.method, context);
	const session = await authRequest.validate();

	if (session && session.user?.role !== "admin") {
		return new Response(null, {
			status: 401,
		});
	}

	const userRows = await db.select().from(users);
	const userCount = userRows.length;

	const flightRows = await db.select().from(flights);
	const flightCount = flightRows.length;

	const messages = await allMessages();
	const messagesTW = messages.messages.filter((m) => {
		const date = new Date(m.createdAt);
		const now = new Date();
		const oneWeekAgo = new Date(now.setDate(now.getDate() - 7));
		return date > oneWeekAgo;
	}).length;

	return new Response(
		JSON.stringify({ userCount, flightCount, messagesTW, messages }),
		{ status: 200 }
	);
}
