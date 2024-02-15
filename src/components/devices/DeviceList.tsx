"use client";
import { CompleteDevice } from "@/lib/db/schema/devices";
import { trpc } from "@/lib/trpc/client";
import DeviceModal from "./DeviceModal";

export default function DeviceList({ devices }: { devices: CompleteDevice[] }) {
	const { data: d } = trpc.devices.getDevices.useQuery(undefined, {
		initialData: { devices },
		refetchOnMount: false,
	});

	if (d.devices.length === 0) {
		return <EmptyState />;
	}

	return (
		<ul>
			{d.devices.map((device) => (
				<Device device={device} key={device.id} />
			))}
		</ul>
	);
}

const Device = ({ device }: { device: CompleteDevice }) => {
	return (
		<li className="flex justify-between my-2">
			<div className="w-full">
				<h3 className="font-semibold text-lg">{device.name}</h3>
				<p className="text-sm text-muted-foreground">
					{device.serial} (Last updated: {device.updatedAt.toString()})
				</p>
			</div>
			<DeviceModal device={device} />
		</li>
	);
};

const EmptyState = () => {
	return (
		<div className="text-center">
			<h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
				No devices
			</h3>
			<p className="mt-1 text-sm text-muted-foreground">
				Get started by creating a new device.
			</p>
			<div className="mt-6">
				<DeviceModal emptyState={true} />
			</div>
		</div>
	);
};
