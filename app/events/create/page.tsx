"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import CreateEventForm from "@/components/CreateEventForm";
import { Suspense } from "react";

export default function CreateEventPage() {
    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/api/auth/signin");
        }
    }, [status, router]);

    if (status === "loading") return <div>Loading...</div>;
    if (!session) return null;

    return (
        <Suspense fallback={<div>Loading form...</div>}>
            <CreateEventForm />
        </Suspense>
    );
}
