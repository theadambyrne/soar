"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import FlightForm from "./FlightForm";
import { Flight } from "@/lib/db/schema/flights";
import { Upload } from "lucide-react";

export default function FlightModal({
	flight,
	emptyState,
}: {
	flight?: Flight;
	emptyState?: boolean;
}) {
	const [open, setOpen] = useState(false);
	const closeModal = () => setOpen(false);
	const editing = !!flight?.id;
	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<DialogTrigger asChild>
				{emptyState ? (
					<Button>
						<Upload size={16} className="mr-1" />
						Upload Flight
					</Button>
				) : (
					<Button
						variant={editing ? "ghost" : "outline"}
						size={editing ? "sm" : "icon"}
					>
						{editing ? "Edit" : <Upload size={16} />}
					</Button>
				)}
			</DialogTrigger>
			<DialogContent>
				<DialogHeader className="px-5 pt-5">
					<DialogTitle>{editing ? "Edit" : "Create"} Flight</DialogTitle>
				</DialogHeader>
				<div className="px-5 pb-5">
					<FlightForm closeModal={closeModal} flight={flight} />
				</div>
			</DialogContent>
		</Dialog>
	);
}
