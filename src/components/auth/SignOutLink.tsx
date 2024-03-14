"use client";

import { useRouter } from "next/navigation";

export default function SignOutLink() {
	const router = useRouter();
	const handleSignOut = async () => {
		const response = await fetch("/api/sign-out", {
			method: "POST",
			redirect: "manual",
		});

		if (response.status === 0) {
			return router.refresh();
		}
	};

	return (
		<span
			onClick={handleSignOut}
			className="text-lg font-medium hover:underline underline-offset-4"
		>
			Sign out
		</span>
	);
}
