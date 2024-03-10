import { db } from "@/lib/db/index";
import { users } from "@/lib/db/schema/auth";
import { auth } from "@/lib/auth/lucia";
import * as context from "next/headers";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
export async function POST(request: Request) {
	const authRequest = auth.handleRequest(request.method, context);
	const session = await authRequest.validate();

	if (session && session.user?.role !== "admin") {
		return new Response(null, {
			status: 401,
		});
	}

	const body = await request.text();
	const email = decodeURIComponent(body.split("=")[1]);
	await db.update(users).set({ role: "user" }).where(eq(users.email, email));

	return redirect("/admin");
}
