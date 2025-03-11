"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import { NavBar } from "./navbar";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <body
          className={`${inter.variable} antialiased  text-white bg-charcoal_black`}
        >
          <NavBar />
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeIn" }}
            >
              <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                disableTransitionOnChange
              >
                <SessionProvider>
                  {children}
                  <Toaster />
                </SessionProvider>
              </ThemeProvider>
            </motion.div>
          </AnimatePresence>
        </body>
      </html>
    </QueryClientProvider>
  );
}
