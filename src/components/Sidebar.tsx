import Link from "next/link";

import SidebarItems from "./SidebarItems";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Send } from "lucide-react";

import { AuthSession, getUserAuth } from "@/lib/auth/utils";

const Sidebar = async () => {
	const session = await getUserAuth();
	if (session.session === null) return null;

	return (
		<aside className="h-screen min-w-52 bg-muted hidden md:block p-4 pt-8 border-r border-border shadow-inner">
			<div className="flex flex-col justify-between h-full">
				<div className="space-y-4">
					<Link href="/" className="flex items-center ml-4 mb-10">
						<Send className="w-6 h-6" />
						<h3 className="text-2xl font-semibold ml-4">Soar</h3>
					</Link>
					<SidebarItems />
				</div>
				<UserDetails session={session} />
			</div>
		</aside>
	);
};

export default Sidebar;

const UserDetails = ({ session }: { session: AuthSession }) => {
	if (session.session === null) return null;
	const { user } = session.session;

	if (!user?.name || user.name.length == 0) return null;

	return (
		<Link href="/account">
			<div className="flex items-center justify-between w-full border-t border-border pt-4 px-2">
				<div className="text-muted-foreground">
					<p className="text-xs">{user.name ?? "loading..."}</p>
					<p className="text-xs font-light pr-4">{user.email ?? "loading.."}</p>
				</div>
				<Avatar className="h-10 w-10">
					<AvatarFallback className="border-border border-2 text-muted-foreground">
						{user.name
							? user.name
									?.split(" ")
									.map((word) => word[0].toUpperCase())
									.join("")
							: "~"}
					</AvatarFallback>
				</Avatar>
			</div>
		</Link>
	);
};
