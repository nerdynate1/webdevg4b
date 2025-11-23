"use client";

import Link from "next/link";
import Image from "next/image";
import {useTheme} from "@/components/providers/theme-provider";
import {useFontSize} from "@/components/providers/font-size-provider";
import {useCart} from "@/components/providers/cart-provider";
import {usePathname} from "next/navigation";
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {useSidebar} from "@/components/providers/sidebar-provider";
import {
    AArrowDownIcon,
    AArrowUpIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    MenuIcon,
    MoonIcon,
    SunIcon
} from "lucide-react";
import CartButton from "@/components/cartButton";

export function Topbar() {
    const {theme, toggle} = useTheme();
    const {increase, decrease} = useFontSize();
    const {count} = useCart();
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const {toggle: toggleSidebar, collapsed: isSidebarCollapsed} = useSidebar();

    return (
        <header
            className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-14 w-full items-center justify-between gap-3 px-3 md:px-4 relative">
                {/* Left side controls */}
                <div className="flex items-center gap-2">
                    {/* Desktop: sidebar collapse toggle */}
                    <div className="hidden md:block">
                        <Button
                            aria-label="Toggle sidebar"
                            size="icon"
                            variant="outline"
                            onClick={toggleSidebar}
                        >
                            {isSidebarCollapsed ? (
                                <ChevronRightIcon className="h-5 w-5"/>
                            ) : (
                                <ChevronLeftIcon className="h5 w-5"/>
                            )}

                        </Button>
                    </div>
                    {/* Mobile: hamburger + logo */}
                    <div className="md:hidden inline-flex items-center gap-2">
                        <Button
                            aria-label="Open menu"
                            onClick={() => setOpen(true)}
                            size="icon"
                            variant="outline"
                        >
                            <span className="sr-only">Open menu</span>
                            <MenuIcon className="h-5 w-5"/>
                        </Button>
                        <Link href="/" aria-label="Star Catering home" className="inline-flex items-center">
                            <Image
                                src="/icon.png"
                                alt="Star Catering"
                                width={38}
                                height={38}
                                className="shrink-0 rounded"
                                style={{backgroundColor: "transparent"}}
                            />
                        </Link>
                    </div>
                </div>
                <div className="flex-1"/>
                <div className="flex items-center gap-2">
                    <Button aria-label="Decrease font size" size="sm" variant="outline" onClick={decrease}>
                        <AArrowDownIcon className="h-5 w-5"/>
                    </Button>
                    <Button aria-label="Increase font size" size="sm" variant="outline" onClick={increase}>
                        <AArrowUpIcon className="h-5 w-5"/>
                    </Button>
                    <Button aria-label="Toggle theme" size="sm" variant="outline" onClick={toggle}>
                        {theme === "dark" ? (
                            <SunIcon className="h-5 w-5"/>
                        ) : (
                            <MoonIcon className="h-5 w-5"/>
                        )}
                    </Button>
                    <Link href="/checkout" aria-label="Shopping cart" className="inline-flex items-center gap-2">
                        <CartButton itemCount={count}/>
                    </Link>
                </div>
            </div>

            {/* Mobile overlay menu */}
            {open && (
                <div className="md:hidden">
                    <div
                        className="fixed inset-0 z-50 bg-black"
                        onClick={() => setOpen(false)}
                        aria-hidden
                    />
                    <div
                        className="fixed inset-y-0 left-0 z-50 w-72 bg-background text-primary-foreground border-r border-sidebar-border shadow-lg">
                        <div className="flex items-center justify-between px-4 h-14 border-b">
                            <Image
                                src="/icon.png"
                                alt="Star Catering"
                                width={28}
                                height={28}
                                className="shrink-0 rounded"
                                style={{backgroundColor: "transparent"}}
                            />
                            <span className="font-semibold">Star Catering</span>
                            <Button aria-label="Close menu" onClick={() => setOpen(false)} size="icon"
                                    variant="outline">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                     strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </Button>
                        </div>
                        <nav className="p-2 bg-background">
                            {[
                                {href: "/", label: "Home"},
                                {href: "/menu", label: "Menu"},
                                {href: "/about", label: "About Us"},
                                {href: "/contact", label: "Contact Us"},
                                {href: "/venues", label: "Venues"},
                                {href: "/faq", label: "FAQ"},
                                {href: "/occasions", label: "Occasions"},
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
