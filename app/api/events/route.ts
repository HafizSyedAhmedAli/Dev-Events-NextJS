import {NextRequest, NextResponse} from 'next/server'
import connectDB from "@/lib/mongodb";
import Event from "@/database/event.model"
import {v2 as cloudinary} from 'cloudinary';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json(
            { message: "You must be signed in to create an event." },
            { status: 401 }
        );
    }

    try {
        await connectDB();

        const formData = await request.formData();
        let event = Object.fromEntries(formData.entries());

        const file = formData.get("image") as File;
        if (!file) return NextResponse.json({ message: "Image file is required" }, { status: 400 });

        let tags = JSON.parse(formData.get('tags') as string);
        let agenda = JSON.parse(formData.get('agenda') as string);

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ resource_type: "image", folder: "DevEvent" }, (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }).end(buffer);
        });

        event.image = (uploadResult as { secure_url: string }).secure_url;

        const createdEvent = await Event.create({
            ...event,
            tags,
            agenda,
        });

        return NextResponse.json({ message: "Event created successfully.", event: createdEvent }, { status: 201 });
    } catch (e) {
        console.error(e);
        return NextResponse.json(
            { message: "Event Creation Failed", error: e instanceof Error ? e.message : "Unknown" },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        await connectDB();

        const events = await Event.find().sort({createdAt: -1});

        return NextResponse.json({message: "Events fetched successfully", events}, {status: 200});
    } catch (e) {
        return NextResponse.json({message: "Event fetching failed", error: e}, {status: 500});
    }
}

