import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/lucia";
import * as context from "next/headers";

import crypto from "crypto";
import { Bucket } from "sst/node/bucket";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Size } from "aws-cdk-lib/core";

const uploadFile = async (url: string, file: File) => {
	const image = await fetch(url, {
		body: file,
		method: "PUT",
		headers: {
			"Content-Type": file.type,
			"Content-Disposition": `attachment; filename="${file.name}"`,
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
	const message = formBody.get("message");

	const command = new PutObjectCommand({
		ACL: "authenticated-read",
		Key: crypto.randomUUID(),
		Bucket: Bucket.public.bucketName,
	});

	const url = await getSignedUrl(new S3Client({}), command);
	const res = await uploadFile(url, file);

	try {
		return NextResponse.json({ user_id, res, message });
	} catch (error) {
		return NextResponse.json({ error });
	}
}