import type { Metadata } from "next";
<<<<<<< HEAD
import RootLayout from "./RootLayout"; // Import the client layout
=======
import RootLayout from "./RootLayout";
import "./globals.css";
>>>>>>> c53f8ed90fa7ff8ca373ac2db05ff9d9a43e4893

export const metadata: Metadata = {
  title: "CIT-U Intramurals",
  description: "...",
};

<<<<<<< HEAD
// Create the QueryClient outside of the component to avoid re-instantiating it

export default function Layout({children}: { children: React.ReactNode }) {
    return (
        <RootLayout>{children}</RootLayout>
    );
=======
export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootLayout>{children}</RootLayout>;
>>>>>>> c53f8ed90fa7ff8ca373ac2db05ff9d9a43e4893
}
