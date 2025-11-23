"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Minimal shadcn/ui-compatible Skeleton component
 * Usage: <Skeleton className="h-4 w-24" />
 */
export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse rounded-md bg-muted", className)} {...props} />;
}

export default Skeleton;
