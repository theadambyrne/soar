import DeviceList from "@/components/devices/DeviceList";
import NewDeviceModal from "@/components/devices/DeviceModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function Devices() {
  await checkAuth();
  const { devices } = await api.devices.getDevices.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Devices</h1>
        <NewDeviceModal />
      </div>
      <DeviceList devices={devices} />
    </main>
  );
}
