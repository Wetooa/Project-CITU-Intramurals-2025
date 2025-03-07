import type { Metadata } from "next";
import RootLayout from "./RootLayout"; // Import the client layout

export const metadata: Metadata = {
    title: "CIT-U Intramurals",
    description: "...",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <RootLayout>{children}</RootLayout>;
}
