import "@radix-ui/themes/styles.css";
import "./globals.css";
import './theme-config.css';

import ReactQueryClientProvider from '@/components/QueryClientProvider';
import { ToggleTheme } from "@/components/UI";
import { Container } from "@radix-ui/themes";
import type { Metadata } from "next";
import { Parkinsans } from "next/font/google";
import { PropsWithChildren } from "react";
import AuthProvider from "./auth/Provider";


export const metadata: Metadata = {
    title: "Issue Tracker Platform",
    description: "Issue Tracker Platform to track your project's issues.",
}
const parkinSans = Parkinsans({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-parkinsans",
})

export default function RootLayout({ children }: PropsWithChildren) {
    return (
        <html lang="en" className={parkinSans.variable} >
            <body
                className={`${parkinSans.variable} antialiased`} >
                <ReactQueryClientProvider >
                    <AuthProvider >
                        <ToggleTheme >
                            <main className={`px-5`} >
                                <Container >
                                    {children}
                                </Container >
                            </main >
                        </ToggleTheme >
                    </AuthProvider >
                </ReactQueryClientProvider >
            </body >
        </html >
    );
}
