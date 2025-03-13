"use client";

import {ThemeProvider} from "@/components/theme-provider";
import {Toaster} from "@/components/ui/sonner";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {AnimatePresence, motion} from "framer-motion";
import {Inter} from "next/font/google";
import {usePathname} from "next/navigation";
import "./globals.css";
import {NavBar} from "./navbar";

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
                className={`${inter.variable} antialiased min-w-screen flex flex-col min-h-screen text-white bg-charcoal_black pt-20`}
            >
            <NavBar/>
            <AnimatePresence mode="wait">
                <motion.div
                    key={pathname}
                    initial={{opacity: 0, y: 10}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.3, ease: "easeIn"}}
                    className="flex-1"
                >
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="dark"
                        disableTransitionOnChange
                    >
                        {children}
                        <Toaster/>
                    </ThemeProvider>
                </motion.div>
            </AnimatePresence>
            </body>
            </html>
        </QueryClientProvider>
    );
}
