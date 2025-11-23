import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { FontSizeProvider } from "@/components/providers/font-size-provider";
import { CartProvider } from "@/components/providers/cart-provider";
import { Sidebar } from "@/components/sidebar";
import { Topbar } from "@/components/topbar";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Star Catering",
  description: "Star Catering — Modern catering services and venues",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <ThemeProvider>
          <FontSizeProvider>
            <CartProvider>
              <div className="min-h-screen bg-background text-foreground flex">
                <Sidebar />
                <div className="flex-1 flex min-h-screen flex-col">
                  <Topbar />
                  <main className="flex-1 p-4 md:p-8" id="main-content">
                    {children}
                  </main>
                </div>
              </div>
              <Toaster richColors position="top-right" />
            </CartProvider>
          </FontSizeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
