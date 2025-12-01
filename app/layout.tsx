import type {Metadata} from "next";
import {Martian_Mono, Schibsted_Grotesk} from "next/font/google";
import "./globals.css";
import React from "react";
import LightRays from "@/components/LightRays";
import Navbar from "@/components/Navbar";
import {Providers} from "@/components/Providers";
import {Toaster} from 'react-hot-toast';
import dynamic from "next/dynamic";

const PostHogProvider = dynamic(
    () =>
        import("@/components/PostHogProvider").then((mod) => mod.PostHogProvider),
    {ssr: false}
);

const schibstedGrotesk = Schibsted_Grotesk({
    variable: "--font-schibsted-grotesk",
    subsets: ["latin"],
});

const martianMono = Martian_Mono({
    variable: "--font-martian-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "DevEvents",
    description: "The Hub for Every Dev Event You Mustn't Miss",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
        <body
            className={`${schibstedGrotesk.variable} min-h-screen ${martianMono.variable} antialiased`}
        >
        <Toaster/>
        <Providers>
            <PostHogProvider>
                <div className="absolute inset-0 top-0 -z-10 min-h-screen">
                    <LightRays
                        raysOrigin="top-center-offset"
                        raysColor="#5dfeca"
                        raysSpeed={0.5}
                        lightSpread={0.9}
                        rayLength={1.4}
                        followMouse={true}
                        mouseInfluence={0.02}
                        noiseAmount={0.0}
                        distortion={0.01}
                    />
                </div>

                <header>
                    <Navbar/>
                </header>

                <main>
                    {children}
                </main>
            </PostHogProvider>
        </Providers>
        </body>
        </html>
    );
}
