// components/ClientProviders.tsx
'use client';

import React, {ReactNode, Suspense} from 'react';
import {SessionProvider} from 'next-auth/react';
import type {Session} from 'next-auth';
import {PostHogProvider} from './PostHogProvider';

interface ClientProvidersProps {
    children: ReactNode;
    session?: Session | null;
}

export default function ClientProviders({children, session}: ClientProvidersProps) {
    return (
        <SessionProvider session={session}>
            <Suspense fallback={null}>
                <PostHogProvider>
                    {children}
                </PostHogProvider>
            </Suspense>
        </SessionProvider>
    );
}
