"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

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
		<Link href="#">
			<span
				onClick={handleSignOut}
				className="text-lg font-medium hover:underline underline-offset-4"
			>
				Sign out
			</span>
		</Link>
	);
}
