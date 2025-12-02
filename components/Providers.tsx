"use client";

import React, {Suspense} from "react";
import {SessionProvider} from "next-auth/react";
import type {Session} from "next-auth";

export function Providers({children, session}: { children: React.ReactNode; session?: Session | null }) {
    return (
        <Suspense fallback={null}>
            <SessionProvider session={session}>
                {children}
            </SessionProvider>
        </Suspense>
    )
}
