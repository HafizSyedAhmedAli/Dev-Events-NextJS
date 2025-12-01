"use client";

import React, {JSX} from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Component(): JSX.Element {
    const { data: session } = useSession();

    if (session) {
        return (
            <>
                <Link href="/events/create">Create Event</Link>
                <button className="cursor-pointer" onClick={() => signOut()}>Sign out</button>
                {session.user?.image &&
                <Image className="rounded-full" src={session.user.image} alt="User picture" width="20" height="20" />}
            </>
        );
    }

    return (
        <>
            <button className="cursor-pointer" onClick={() => signIn()}>Sign in</button>
        </>
    );
}
