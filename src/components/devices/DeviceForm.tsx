"use client";

import {
	Device,
	NewDeviceParams,
	insertDeviceParams,
} from "@/lib/db/schema/devices";
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
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const DeviceForm = ({
	device,
	closeModal,
}: {
	device?: Device;
	closeModal?: () => void;
}) => {
	const editing = !!device?.id;

	const router = useRouter();
	const utils = trpc.useContext();

	const form = useForm<z.infer<typeof insertDeviceParams>>({
		// latest Zod release has introduced a TS error with zodResolver
		// open issue: https://github.com/colinhacks/zod/issues/2663
		// errors locally but not in production
		resolver: zodResolver(insertDeviceParams),
		defaultValues: device ?? {
			name: "",
			serial: "",
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

		await utils.devices.getDevices.invalidate();
		router.refresh();
		if (closeModal) closeModal();
		toast.success(`Device ${action}d!`);
	};

	const onError = (
		action: "create" | "update" | "delete",
		data: { error: string }
	) => {
		toast.error(`Failed to ${action} device: ${data.error}`);
	};

	const { mutate: createDevice, isLoading: isCreating } =
		trpc.devices.createDevice.useMutation({
			onSuccess: (res) => onSuccess("create"),
			onError: (err) => onError("create", { error: err.message }),
		});

	const { mutate: updateDevice, isLoading: isUpdating } =
		trpc.devices.updateDevice.useMutation({
			onSuccess: (res) => onSuccess("update"),
			onError: (err) => onError("update", { error: err.message }),
		});

	const { mutate: deleteDevice, isLoading: isDeleting } =
		trpc.devices.deleteDevice.useMutation({
			onSuccess: (res) => onSuccess("delete"),
			onError: (err) => onError("delete", { error: err.message }),
		});

	const handleSubmit = (values: NewDeviceParams) => {
		if (editing) {
			updateDevice({ ...values, id: device.id });
		} else {
			createDevice(values);
		}
	};
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="serial"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Serial</FormLabel>
							<FormControl>
								<Input {...field} />
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
						onClick={() => deleteDevice({ id: device.id })}
					>
						Delet{isDeleting ? "ing..." : "e"}
					</Button>
				) : null}
			</form>
		</Form>
	);
};

export default DeviceForm;
