// app/events/create/page.tsx
import {redirect} from "next/navigation";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import CreateEventForm from "@/components/CreateEventForm";
import {Suspense} from "react";

const CreateEventPage = async () => {
    const session = await getServerSession(authOptions);

    // Redirect if user is not signed in
    if (!session) {
        redirect("/api/auth/signin");
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CreateEventForm/>
            );
        </Suspense>
    );
}

export default CreateEventPage;
