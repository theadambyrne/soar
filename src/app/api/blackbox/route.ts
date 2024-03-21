import { NextResponse } from "next/server";

import crypto from "crypto";
import { Bucket } from "sst/node/bucket";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Bucket as S3Bucket } from "aws-cdk-lib/aws-s3";

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

function combineArraysToMatrix(time: number[], alt: number[]): any[][] {
	return time.map((value, index) => [value, alt[index]]);
}
function matrixToCsv(matrix: any[][]): string {
	const data = matrix.map((row) => row.join(",")).join("\n");
	const headers = "time,altitude\n";
	return headers + data;
}
export async function POST(request: Request) {
	const data = await request.json();
	const matrix = combineArraysToMatrix(data.time, data.alt);
	const csv = matrixToCsv(matrix);
	const file = new File([csv], "live-demo.csv", { type: "text/csv" });
	console.log(file);
	if (!("public" in Bucket)) {
		return NextResponse.json({ error: "Bucket not found" });
	}

	const bucket = Bucket.public as S3Bucket;

	const command = new PutObjectCommand({
		ACL: "public-read",
		Key: crypto.randomUUID(),
		Bucket: bucket.bucketName,
	});

	const url = await getSignedUrl(new S3Client({}), command);
	const res = await uploadFile(url, file, "live-demo.csv");

	try {
		return NextResponse.json({ url: res });
	} catch (error) {
		return NextResponse.json({ error });
	}
}
