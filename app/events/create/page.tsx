// app/events/create/page.tsx
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const CreateEventPage = async () => {
    const session = await getServerSession(authOptions);

    // Redirect if user is not signed in
    if (!session) {
        redirect("/api/auth/signin");
    }

    return (
        <div>
            <h1 className="text-center">Create Event</h1>
        </div>
    );
};

export default CreateEventPage;
