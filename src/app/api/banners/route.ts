import { auth } from "@/lib/auth/lucia";
import * as context from "next/headers";

import { createBanner } from "@/lib/api/banners/mutations";
import { redirect } from "next/navigation";
import { getBanners } from "@/lib/api/banners/queries";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
	const formBody = await req.formData();
	const authRequest = auth.handleRequest(req.method, context);
	const session = await authRequest.validate();

	if (session && session.user?.role !== "admin") {
		return new Response(null, {
			status: 401,
		});
	}

	await createBanner({
		title: formBody.get("title") as string,
		content: formBody.get("content") as string,
		color: formBody.get("color") as string,
	});
	return redirect("/");
}

export async function GET(req: Request) {
	const { banners } = await getBanners();
	const banner = banners[0];

	return NextResponse.json({ banner });
}
