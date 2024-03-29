import { auth } from "@/lib/auth/lucia";
import { LuciaError } from "lucia";
import * as context from "next/headers";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
	const formData = await request.formData();
	const username = formData.get("username");
	const email = formData.get("email");
	const name = formData.get("name");
	const password = formData.get("password");
	// basic check
	if (
		typeof username !== "string" ||
		username.length < 4 ||
		username.length > 31
	) {
		return NextResponse.json(
			{
				error: "Invalid username",
			},
			{
				status: 400,
			}
		);
	}
	if (typeof email !== "string" || email.length < 4 || email.length > 31) {
		return NextResponse.json(
			{
				error: "Invalid email",
			},
			{
				status: 400,
			}
		);
	}
	if (typeof name !== "string" || name.length < 4 || name.length > 31) {
		return NextResponse.json(
			{
				error: "Invalid name",
			},
			{
				status: 400,
			}
		);
	}
	if (
		typeof password !== "string" ||
		password.length < 6 ||
		password.length > 255
	) {
		return NextResponse.json(
			{
				error: "Invalid password",
			},
			{
				status: 400,
			}
		);
	}
	try {
		const user = await auth.createUser({
			key: {
				providerId: "username", // auth method
				providerUserId: username.toLowerCase(), // unique id when using "username" auth method
				password, // hashed by Lucia
			},
			attributes: {
				username,
				name: name,
				email: email,
				role: "user",
			},
		});
		const session = await auth.createSession({
			userId: user.userId,
			attributes: {},
		});
		const authRequest = auth.handleRequest(request.method, context);
		authRequest.setSession(session);
		return new Response(null, {
			status: 302,
			headers: {
				Location: "/dashboard", // redirect to profile page
			},
		});
	} catch (e) {
		// this part depends on the database you're using
		// check for unique constraint error in user table
		console.log(e);
		if (e instanceof LuciaError && e.message === "AUTH_DUPLICATE_KEY_ID") {
			return NextResponse.json(
				{
					error: "Username already taken",
				},
				{
					status: 400,
				}
			);
		}

		return NextResponse.json(
			{
				error: "An unknown error occurred",
			},
			{
				status: 500,
			}
		);
	}
};
