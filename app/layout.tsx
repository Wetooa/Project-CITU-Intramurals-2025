import type { Metadata } from "next";
import RootLayout from "./RootLayout"; // Import the client layout

export const metadata: Metadata = {
  title: "CIT-U Intramurals",
  description: "...",
};

<<<<<<< HEAD
export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootLayout>{children}</RootLayout>;
=======
// Create the QueryClient outside of the component to avoid re-instantiating it

export default function Layout({children}: { children: React.ReactNode }) {
    return (
        <RootLayout>{children}</RootLayout>
    );
>>>>>>> 59f78e69515e1c8c78eb25a02e6b4c246dffdc5c
}
