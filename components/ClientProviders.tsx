"use client";

import React from "react";
import { PostHogProvider } from "./PostHogProvider";
import {Providers} from "@/components/Providers";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <Providers>
            <PostHogProvider>
                {children}
            </PostHogProvider>
        </Providers>
    );
}
