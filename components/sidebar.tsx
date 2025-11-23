"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { Home, Phone, Building2, HelpCircle, Calendar } from "lucide-react";
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

const links = [
  { href: "/", label: "Home", Icon: Home },
  { href: "/contact", label: "Contact Us", Icon: Phone },
  { href: "/venues", label: "Venues", Icon: Building2 },
  { href: "/faq", label: "FAQ", Icon: HelpCircle },
  { href: "/occasions", label: "Occasions", Icon: Calendar },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  return (
    <UISidebar className={`transition-all duration-200 overflow-hidden ${collapsed ? "w-16" : "w-64"}`}>
      <SidebarHeader>
        <div className="flex items-center justify-between gap-2">
          <Link href="/" className="inline-flex items-center gap-2">
            {/* Ensure the image element itself never paints a background (light or dark) */}
            <Image
              src="/icon.png"
              alt="Star Catering"
              width={38}
              height={38}
              className="shrink-0 rounded"
              style={{ backgroundColor: "transparent" }}
            />
            <span className={`text-xl font-semibold truncate ${collapsed ? "hidden" : "inline"}`}>Star Catering</span>
          </Link>
          <button
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-md border text-xs"
            onClick={() => setCollapsed((c) => !c)}
          >
            {collapsed ? ">" : "<"}
          </button>
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
                      <Icon className="h-4 w-4 shrink-0" aria-hidden />
                      <span className={`text-sm ${collapsed ? "sr-only" : "not-sr-only"}`}>{l.label}</span>
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
