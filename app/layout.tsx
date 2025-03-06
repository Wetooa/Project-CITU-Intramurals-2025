import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import { NavBar } from "./navbar";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CIT-U Intramurals",
  description: "...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <NavBar></NavBar>
        {children}
      </body>
    </html>
  );
}
