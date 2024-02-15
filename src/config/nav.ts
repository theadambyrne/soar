import { SidebarLink } from "@/components/SidebarItems";
import { Cog, PlaneIcon, HomeIcon, User, Radio } from "lucide-react";

// type AdditionalLinks = {
//   title: string;
//   links: SidebarLink[];
// };

export const defaultLinks: SidebarLink[] = [
	{ href: "/dashboard", title: "Dashboard", icon: HomeIcon },
	{ href: "/flights", title: "Flights", icon: PlaneIcon },
	{ href: "/devices", title: "Devices", icon: Radio },
	{ href: "/account", title: "Account", icon: User },
	{ href: "/settings", title: "Settings", icon: Cog },
];

// export const additionalLinks: AdditionalLinks[] = [
//   {
//     title: "Entities",
//     links: [
//       {
//         href: "/flights",
//         title: "Flights",
//         icon: Globe,
//       },
//     ],
//   },

// ];
