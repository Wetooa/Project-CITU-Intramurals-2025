"use client"

import { Inter } from "next/font/google";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { NavBar } from "./navbar";
import "./globals.css";

const inter = Inter({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <html lang="en">
        <body className={`${inter.variable} antialiased bg-charcoal_black`}>
        <NavBar />
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeIn" }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
        </body>
        </html>
    );
}
