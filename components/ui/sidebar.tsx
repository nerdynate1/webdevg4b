"use client";

// Minimal shadcn/ui-compatible Sidebar primitives
// API inspired by https://ui.shadcn.com/docs/components/sidebar

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

type DivProps = React.HTMLAttributes<HTMLDivElement>;

export function Sidebar({ className, ...props }: DivProps) {
  return (
    <aside
      className={cn(
        "hidden md:flex md:flex-col w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border",
        className
      )}
      {...props}
    />
  );
}

export function SidebarHeader({ className, ...props }: DivProps) {
  return <div className={cn("px-4 py-4", className)} {...props} />;
}

export function SidebarContent({ className, ...props }: DivProps) {
  return <div className={cn("flex-1 px-2 py-2", className)} {...props} />;
}

export function SidebarGroup({ className, ...props }: DivProps) {
  return <div className={cn("mb-2", className)} {...props} />;
}

export function SidebarGroupLabel({ className, ...props }: DivProps) {
  return (
    <div
      className={cn(
        "px-3 py-2 text-xs font-medium uppercase tracking-wide text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

export function SidebarMenu({ className, ...props }: DivProps) {
  return <nav className={cn("space-y-1", className)} {...props} />;
}

export function SidebarMenuItem({ className, ...props }: DivProps) {
  return <div className={cn("", className)} {...props} />;
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  active?: boolean;
};

export function SidebarMenuButton({ className, asChild, active, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(
        "w-full text-left block rounded-md px-3 py-2 text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        active && "bg-sidebar-primary text-sidebar-primary-foreground",
        className
      )}
      {...props}
    />
  );
}

// Utility: noop export map for tree-shaking parity
export default {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
};
