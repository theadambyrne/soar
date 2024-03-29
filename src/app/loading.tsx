import Image from "next/image";

export default function Loading() {
	return (
		<div className="flex flex-col items-center justify-center h-screen animate-pulse dark:invert">
			<div role="status">
				<Image src="/soar.svg" alt="Loading" width={100} height={100} />
			</div>
		</div>
	);
}
