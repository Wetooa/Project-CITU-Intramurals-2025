import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import React from "react";


export default function BracketScreen() {

    return (
        <>
            <SidebarProvider>
                <main className="w-2xl">
                    <SidebarTrigger/>
                </main>
            </SidebarProvider>
        </>
    )

}