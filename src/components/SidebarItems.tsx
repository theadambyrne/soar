"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { LucideIcon, Shield } from "lucide-react";

import { cn } from "@/lib/utils";
import { defaultLinks } from "@/config/nav";

export interface SidebarLink {
	title: string;
	href: string;
	icon: LucideIcon;
}

const SidebarItems = ({ isAdmin }: { isAdmin: boolean }) => {
	return (
		<>
			<SidebarLinkGroup links={defaultLinks} isAdmin={isAdmin} />
		</>
	);
};
export default SidebarItems;

const SidebarLinkGroup = ({
	links,
	title,
	border,
	isAdmin,
}: {
	links: SidebarLink[];
	title?: string;
	border?: boolean;
	isAdmin?: boolean;
}) => {
	const fullPathname = usePathname();
	const pathname = "/" + fullPathname.split("/")[1];

	if (isAdmin && !links.some((l) => l.title === "Admin")) {
		links.push({
			href: "/admin",
			title: "Admin",
			icon: Shield,
		});
	}
	return (
		<div className={border ? "border-border border-t my-8 pt-4" : ""}>
			{title ? (
				<h4 className="px-2 mb-2 text-xs uppercase text-muted-foreground tracking-wider">
					{title}
				</h4>
			) : null}
			<ul>
				{links.map((link) => (
					<li key={link.title}>
						<SidebarLink link={link} active={pathname === link.href} />
					</li>
				))}
			</ul>
		</div>
	);
};
const SidebarLink = ({
	link,
	active,
}: {
	link: SidebarLink;
	active: boolean;
}) => {
	return (
		<Link
			href={link.href}
			className={`group transition-colors p-2 inline-block hover:bg-popover hover:text-primary text-muted-foreground text-md hover:shadow rounded-md w-full${
				active ? " text-primary font-semibold" : ""
			}`}
		>
			<div className="flex items-center">
				<div
					className={cn(
						"opacity-0 left-0 h-6 w-[4px] absolute rounded-r-lg bg-primary",
						active ? "opacity-100" : ""
					)}
				/>
				<link.icon className="h-8 mr-4" />
				<span>{link.title}</span>
			</div>
		</Link>
	);
};
