"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { AnimatePresence, motion } from "framer-motion";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import { Toaster } from "sonner";
import "./globals.css";
import { NavBar } from "./navbar";
import { SessionProvider } from "next-auth/react";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased bg-mocha`}>
        <NavBar />
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
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
  );
}
