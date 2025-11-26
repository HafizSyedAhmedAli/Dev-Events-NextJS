// lib/constants.ts

export interface Event {
    slug: string;
    image: string;
    title: string;
    location: string;
    date: string;
    time: string;
}

export const events: Event[] = [
    {
        slug: "github-universe-2026",
        image: "/images/event1.png",
        title: "GitHub Universe 2026",
        location: "San Francisco, CA & Virtual",
        date: "November 17-18, 2026",
        time: "9:00 AM - 6:00 PM PST"
    },
    {
        slug: "aws-reinvent-2026",
        image: "/images/event2.png",
        title: "AWS re:Invent 2026",
        location: "Las Vegas, NV",
        date: "December 1-5, 2026",
        time: "8:00 AM - 6:00 PM PST"
    },
    {
        slug: "google-io-2026",
        image: "/images/event3.png",
        title: "Google I/O 2026",
        location: "Mountain View, CA & Virtual",
        date: "May 14-15, 2026",
        time: "10:00 AM - 5:00 PM PST"
    },
    {
        slug: "apple-wwdc-2026",
        image: "/images/event4.png",
        title: "Apple WWDC 2026",
        location: "Cupertino, CA & Virtual",
        date: "June 8-12, 2026",
        time: "10:00 AM - 3:00 PM PST"
    },
    {
        slug: "microsoft-build-2026",
        image: "/images/event5.png",
        title: "Microsoft Build 2026",
        location: "Seattle, WA & Virtual",
        date: "May 19-21, 2026",
        time: "8:00 AM - 5:00 PM PST"
    },
    {
        slug: "react-conf-2026",
        image: "/images/event6.png",
        title: "React Conf 2026",
        location: "New York, NY",
        date: "October 20-21, 2026",
        time: "9:00 AM - 6:00 PM EST"
    },
    {
        slug: "nextjs-conf-2026",
        image: "/images/event1.png",
        title: "Next.js Conf 2026",
        location: "Virtual",
        date: "October 24, 2026",
        time: "9:00 AM - 3:00 PM PST"
    },
    {
        slug: "vercel-ship-2026",
        image: "/images/event2.png",
        title: "Vercel Ship 2026",
        location: "San Francisco, CA",
        date: "September 15, 2026",
        time: "10:00 AM - 5:00 PM PST"
    },
    {
        slug: "ethglobal-bangkok-2026",
        image: "/images/event3.png",
        title: "ETHGlobal Bangkok",
        location: "Bangkok, Thailand",
        date: "November 13-15, 2026",
        time: "48 Hours"
    },
    {
        slug: "mlh-prime-2026",
        image: "/images/event4.png",
        title: "MLH Prime Hackathon 2026",
        location: "Virtual",
        date: "March 21-22, 2026",
        time: "24 Hours"
    },
    {
        slug: "defcon-34",
        image: "/images/event5.png",
        title: "Defcon 34",
        location: "Las Vegas, NV",
        date: "August 6-9, 2026",
        time: "7:00 AM - 2:00 AM PST"
    },
    {
        slug: "kubecon-europe-2026",
        image: "/images/event6.png",
        title: "KubeCon Europe 2026",
        location: "Amsterdam, Netherlands",
        date: "March 23-26, 2026",
        time: "9:00 AM - 6:00 PM CET"
    }
];