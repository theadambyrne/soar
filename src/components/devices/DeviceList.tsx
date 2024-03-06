"use client";
import { CompleteDevice } from "@/lib/db/schema/devices";
import { trpc } from "@/lib/trpc/client";
import DeviceModal from "./DeviceModal";

import { Input } from "../ui/input";
import { useState, useEffect } from "react";

export default function DeviceList({ devices }: { devices: CompleteDevice[] }) {
	const { data: d } = trpc.devices.getDevices.useQuery(undefined, {
		initialData: { devices },
		refetchOnMount: false,
	});

	const [filteredDevices, setFilteredDevices] = useState(d.devices);

	useEffect(() => {
		setFilteredDevices(d.devices);
	}, [d.devices]);

	if (filteredDevices.length === 0) {
		return <EmptyState />;
	}

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const search = e.target.value;
		setFilteredDevices(
			d.devices.filter((device) =>
				device.name.toLowerCase().includes(search.toLowerCase())
			)
		);
	};

	return (
		<div>
			<Input
				placeholder="Search devices"
				type="text"
				className="my-2"
				onChange={(e) => handleSearch(e)}
			/>
			<ul>
				{filteredDevices.map((device) => (
					<Device device={device} key={device.id} />
				))}
			</ul>
		</div>
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
