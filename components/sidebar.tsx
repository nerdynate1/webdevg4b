"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import Image from "next/image";
import {Home, Phone, Building2, HelpCircle, Calendar, Info, UtensilsCrossed} from "lucide-react";
import {
    Sidebar as UISidebar,
    SidebarContent,
    SidebarHeader,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui/sidebar";
import {useSidebar} from "@/components/providers/sidebar-provider";

const links = [
    {href: "/", label: "Home", Icon: Home},
    {href: "/menu", label: "Menu", Icon: UtensilsCrossed},
    {href: "/venues", label: "Venues", Icon: Building2},
    {href: "/occasions", label: "Occasions", Icon: Calendar},
    {href: "/faq", label: "FAQ", Icon: HelpCircle},
    {href: "/about", label: "About Us", Icon: Info},
    {href: "/contact", label: "Contact Us", Icon: Phone},
];

export function Sidebar() {
    const pathname = usePathname();
    const {collapsed} = useSidebar();
    return (
        <UISidebar className={`transition-all duration-200 overflow-hidden ${collapsed ? "w-16" : "w-64"}`}>
            <SidebarHeader>
                <div className="flex items-center justify-between gap-2">
                    <Link href="/" className="inline-flex items-center">
                        {/* Ensure the image element itself never paints a background (light or dark) */}
                        <Image
                            src="/icon.png"
                            alt="Star Catering"
                            width={48}
                            height={48}
                            className="shrink-0 rounded"
                            style={{backgroundColor: "transparent"}}
                        />
                        <span className={`text-xl font-semibold truncate ${collapsed ? "hidden" : "inline"}`}>Star Catering</span>
                    </Link>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className={collapsed ? "hidden" : undefined}>Navigation</SidebarGroupLabel>
                    <SidebarMenu>
                        {links.map((l) => {
                            const active = pathname === l.href;
                            const Icon = l.Icon;
                            return (
                                <SidebarMenuItem key={l.href}>
                                    <SidebarMenuButton asChild active={active}>
                                        <Link href={l.href} className="flex items-center gap-2">
                                            <Icon className="h-6 w-6 shrink-0" aria-hidden/>
                                            <span
                                                className={`text-sm ${collapsed ? "sr-only" : "not-sr-only"}`}>{l.label}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            );
                        })}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
        </UISidebar>
    );
}
