import type { Metadata } from "next";
import RootLayout from "./RootLayout";
import "./globals.css";

export const metadata: Metadata = {
  title: "CIT-U Intramurals",
  description: "...",
};

// Create the QueryClient outside of the component to avoid re-instantiating it

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootLayout>{children}</RootLayout>;
}
