"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

import { AlignRight, Send } from "lucide-react";
import { defaultLinks } from "@/config/nav";

export default function Navbar() {
	const [open, setOpen] = useState(false);
	const pathname = usePathname();
	return (
		<div className="md:hidden border-b mb-4 pb-2 w-full">
			<nav className="flex justify-between w-full items-center">
				<Link href="/" className="flex items-center ml-4">
					<Send className="w-6 h-6 text-primary" />
					<h3 className="text-2xl font-semibold ml-4">Soar</h3>
				</Link>
				<Button variant="ghost" onClick={() => setOpen(!open)}>
					<AlignRight />
				</Button>
			</nav>
			{open ? (
				<div className="my-4 p-4 bg-muted">
					<ul className="space-y-2">
						{defaultLinks.map((link) => (
							<li key={link.title} onClick={() => setOpen(false)} className="">
								<Link
									href={link.href}
									className={
										pathname === link.href
											? "text-primary hover:text-primary font-semibold"
											: "text-muted-foreground hover:text-primary"
									}
								>
									{link.title}
								</Link>
							</li>
						))}
					</ul>
				</div>
			) : null}
		</div>
	);
}
