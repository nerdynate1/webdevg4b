"use client";

import Link from "next/link";
import { useTheme } from "@/components/providers/theme-provider";
import { useFontSize } from "@/components/providers/font-size-provider";
import { useCart } from "@/components/providers/cart-provider";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function Topbar() {
  const { theme, toggle } = useTheme();
  const { increase, decrease } = useFontSize();
  const { count } = useCart();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-3 px-4">
        {/* Mobile hamburger */}
        <div className="md:hidden">
          <button
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border"
          >
            <span className="sr-only">Open menu</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
        <div className="flex-1" />
        <div className="flex items-center gap-2">
          <button
            aria-label="Decrease font size"
            className="inline-flex h-8 w-8 items-center justify-center rounded border text-sm"
            onClick={decrease}
          >A-</button>
          <button
            aria-label="Increase font size"
            className="inline-flex h-8 w-8 items-center justify-center rounded border text-sm"
            onClick={increase}
          >A+</button>
          <button
            aria-label="Toggle theme"
            className="inline-flex h-8 items-center justify-center rounded border px-2 text-sm"
            onClick={toggle}
          >
            {theme === "dark" ? "Light" : "Dark"}
          </button>
          <Link
            href="/checkout"
            className="ml-2 inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-primary-foreground hover:opacity-90"
            aria-label="Shopping cart"
          >
            Cart
            <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-primary-foreground px-1 text-primary text-xs">
              {count}
            </span>
          </Link>
        </div>
      </div>

      {/* Mobile overlay menu */}
      {open && (
        <div className="md:hidden">
          <div
            className="fixed inset-0 z-50 bg-black/80"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div className="fixed inset-y-0 left-0 z-50 w-72 bg-sidebar text-sidebar-foreground border-r border-sidebar-border shadow-lg">
            <div className="flex items-center justify-between px-4 h-14 border-b">
              <span className="font-semibold">Star Catering</span>
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <nav className="p-2">
              {[
                { href: "/", label: "Home" },
                { href: "/contact", label: "Contact Us" },
                { href: "/venues", label: "Venues" },
                { href: "/faq", label: "FAQ" },
                { href: "/occasions", label: "Occasions" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-md px-3 py-2 text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
                    pathname === l.href ? "bg-sidebar-primary text-sidebar-primary-foreground" : ""
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
