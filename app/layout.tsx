import "@radix-ui/themes/styles.css";
import "./globals.css";
import './theme-config.css';

import {NavBar} from "@/components/UI";
import {Container, Theme} from "@radix-ui/themes";
import type {Metadata} from "next";
import {Parkinsans} from "next/font/google";
import AuthProvider from "./auth/Provider";
import ReactQueryClientProvider from '@/components/QueryClientProvider'
import {PropsWithChildren} from "react";


export const metadata: Metadata = {
    title: "Issue Tracker Platform",
    description: "Issue Tracker Platform to track your project's issues.",
}
const parkinSans = Parkinsans({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-parkinsans",
})

export default function RootLayout({children}: PropsWithChildren) {
    return (
        <html lang="en" className={parkinSans.variable} >
        <body
            className={`${parkinSans.variable} antialiased`} >
        <ReactQueryClientProvider >
            <AuthProvider >
                <Theme accentColor="violet" grayColor="sand" radius="large" scaling="110%" appearance="dark" >
                    <NavBar />
                    <main className={`px-5`} >
                        <Container >
                            {children}
                        </Container >
                    </main >
                </Theme >
            </AuthProvider >
        </ReactQueryClientProvider >
        </body >
        </html >
    );
}
