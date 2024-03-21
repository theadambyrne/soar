import { NextResponse } from "next/server";

import crypto from "crypto";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

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

	const command = new PutObjectCommand({
		ACL: "public-read",
		Key: crypto.randomUUID(),
		Bucket: "production-soar-site-blackboxfilesbucketb77355ea-yuhpgmqjiw1r",
	});

	const url = await getSignedUrl(new S3Client({}), command);
	const res = await uploadFile(url, file, "live-demo.csv");

	try {
		return NextResponse.json({ url: res });
	} catch (error) {
		return NextResponse.json({ error });
	}
}
