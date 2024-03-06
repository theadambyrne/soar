import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
	createMessage,
	deleteMessage,
	updateMessage,
} from "@/lib/api/messages/mutations";
import {
	messageIdSchema,
	insertMessageParams,
	updateMessageParams,
} from "@/lib/db/schema/messages";
import { allMessages, getMessages } from "@/lib/api/messages/queries";

export async function POST(req: Request) {
	try {
		const validatedData = insertMessageParams.parse(await req.json());
		const { message } = await createMessage(validatedData);

		// revalidatePath("/messages"); // optional - assumes you will have named route same as entity

		return NextResponse.json(message, { status: 200 });
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 });
		} else {
			return NextResponse.json({ error: err }, { status: 500 });
		}
	}
}

export async function PUT(req: Request) {
	try {
		const { searchParams } = new URL(req.url);
		const id = searchParams.get("id");

		const validatedData = updateMessageParams.parse(await req.json());
		const validatedParams = messageIdSchema.parse({ id });

		const { message } = await updateMessage(validatedParams.id, validatedData);

		return NextResponse.json(message, { status: 200 });
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 });
		} else {
			return NextResponse.json(err, { status: 500 });
		}
	}
}

export async function DELETE(req: Request) {
	try {
		const { searchParams } = new URL(req.url);
		const id = searchParams.get("id");

		const validatedParams = messageIdSchema.parse({ id });
		const { message } = await deleteMessage(validatedParams.id);

		return NextResponse.json(message, { status: 200 });
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 });
		} else {
			return NextResponse.json(err, { status: 500 });
		}
	}
}

export async function GET(req: Request) {
	// GET ALL MESSAGES if user role is admin

	try {
		const messages = await allMessages();
		return NextResponse.json(messages, { status: 200 });
	} catch (err) {
		return NextResponse.json(err, { status: 500 });
	}
}
