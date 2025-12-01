// app/events/create/page.tsx
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CreateEventForm from "@/components/CreateEventForm";

const CreateEventPage = async () => {
    const session = await getServerSession(authOptions);

    // Redirect if user is not signed in
    if (!session) {
        redirect("/api/auth/signin");
    }

    return <CreateEventForm />;
};

export default CreateEventPage;
