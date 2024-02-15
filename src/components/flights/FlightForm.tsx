"use client";

import {
	Flight,
	NewFlightParams,
	insertFlightParams,
} from "@/lib/db/schema/flights";

import { Device } from "@/lib/db/schema/devices";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc/client";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const FlightForm = ({
	flight,

	closeModal,
}: {
	flight?: Flight;
	closeModal?: () => void;
}) => {
	const editing = !!flight?.id;

	const router = useRouter();
	const utils = trpc.useContext();

	const { data: devices } =
		trpc.devices.getDevices.useQuery(undefined, {
			refetchOnMount: false,
		}) ?? ({ devices: [] } as { devices: Device[] });

	const form = useForm<z.infer<typeof insertFlightParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertFlightParams),
		defaultValues: flight ?? {
			recordedAt: new Date(),
		},
	});

	const onSuccess = async (
		action: "create" | "update" | "delete",
		data?: { error?: string }
	) => {
		if (data?.error) {
			toast.error(data.error);
			return;
		}

		await utils.flights.getFlights.invalidate();
		router.refresh();
		if (closeModal) closeModal();
		toast.success(`Flight ${action}d!`);
	};

	const onError = (
		action: "create" | "update" | "delete",
		data: { error: string }
	) => {
		toast.error(`Failed to ${action} flight: ${data.error}`);
	};

	const { mutate: createFlight, isLoading: isCreating } =
		trpc.flights.createFlight.useMutation({
			onSuccess: (res) => onSuccess("create"),
			onError: (err) => onError("create", { error: err.message }),
		});

	const { mutate: updateFlight, isLoading: isUpdating } =
		trpc.flights.updateFlight.useMutation({
			onSuccess: (res) => onSuccess("update"),
			onError: (err) => onError("update", { error: err.message }),
		});

	const { mutate: deleteFlight, isLoading: isDeleting } =
		trpc.flights.deleteFlight.useMutation({
			onSuccess: (res) => onSuccess("delete"),
			onError: (err) => onError("delete", { error: err.message }),
		});

	const handleSubmit = (values: NewFlightParams) => {
		if (editing) {
			updateFlight({ ...values, id: flight.id });
		} else {
			createFlight(values);
		}
	};
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
				<FormField
					control={form.control}
					name="recordedAt"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Recorded At</FormLabel>
							<br />
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant={"outline"}
											className={cn(
												"w-[240px] pl-3 text-left font-normal",
												!field.value && "text-muted-foreground"
											)}
										>
											{field.value ? (
												format(new Date(field.value), "PPP")
											) : (
												<span>Pick a date</span>
											)}
											<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0" align="start">
									<Calendar
										mode="single"
										selected={new Date(field.value)}
										onSelect={field.onChange}
										disabled={(date) =>
											date > new Date() || date < new Date("1900-01-01")
										}
										initialFocus
									/>
								</PopoverContent>
							</Popover>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="data"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Data file</FormLabel>

							<FormControl>
								{editing ? (
									<div className="flex items-center space-x-2">
										<span>{flight?.data}</span>
									</div>
								) : (
									<Input type="file" {...field} />
								)}
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="deviceId"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Device</FormLabel>
							<FormControl>
								<select {...field} className="w-full">
									<option value={""}>Select a device</option>
									{devices === undefined ? (
										<option disabled>Loading...</option>
									) : (
										<>
											{devices.devices.map((device) => (
												<option key={device.id} value={device.id}>
													{device.name}
												</option>
											))}
										</>
									)}
								</select>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					type="submit"
					className="mr-1"
					disabled={isCreating || isUpdating}
				>
					{editing
						? `Sav${isUpdating ? "ing..." : "e"}`
						: `Creat${isCreating ? "ing..." : "e"}`}
				</Button>
				{editing ? (
					<Button
						type="button"
						variant={"destructive"}
						onClick={() => deleteFlight({ id: flight.id })}
					>
						Delet{isDeleting ? "ing..." : "e"}
					</Button>
				) : null}
			</form>
		</Form>
	);
};

export default FlightForm;
