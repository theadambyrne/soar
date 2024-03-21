import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/lucia";
import * as context from "next/headers";

import crypto from "crypto";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { createMessage, getMessages } from "@/lib/api/messages/queries";

const uploadFile = async (url: string, file: File, filename: String) => {
	const image = await fetch(url, {
		body: file,
		method: "PUT",
		headers: {
			"Content-Type": file.type,
			"Content-Disposition": `attachment; filename="${filename}"`,
		},
	});

	return image.url.split("?")[0];
};

export async function POST(request: Request) {
	const formBody = await request.formData();

	// Make sure the request is authenticated
	const authRequest = auth.handleRequest(request.method, context);
	const session = await authRequest.validate();
	if (!session) {
		return new Response(null, {
			status: 401,
		});
	}

	// Data needed for upload
	const user_id = session.user.userId;
	const file = formBody.get("file") as File;

	const command = new PutObjectCommand({
		ACL: "public-read",
		Key: crypto.randomUUID(),
		Bucket: "production-soar-site-supportfilesbucket99cc0b41-qkpnmahtgwl1",
	});

	const url = await getSignedUrl(new S3Client({}), command);
	const filename = user_id + "/" + file.name;
	const res = await uploadFile(url, file, filename);

	const message = {
		content: formBody.get("message") as string,
		filepath: res,
		userId: "mbahjyo4rqhnv8r", // need to be linked to device post prototype :: future me enjoy!
	};

	await createMessage(message);

	try {
		return NextResponse.json({ res });
	} catch (error) {
		return NextResponse.json({ error });
	}
}
export async function GET(request: Request) {
	const authRequest = auth.handleRequest(request.method, context);
	const session = await authRequest.validate();
	if (!session) {
		return new Response(null, {
			status: 401,
		});
	}

	const messages_data = await getMessages();
	const messages = messages_data.messages;
	try {
		return NextResponse.json({ messages });
	} catch (error) {
		return NextResponse.json({ error });
	}
}
