import {IEvent} from "@/database";
import EventCard from "@/components/EventCard";
import {cacheLife} from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const Page = async () => {
    "use cache";
    cacheLife("hours");
    const response = await fetch(`${BASE_URL}/api/events`);
    const {events} = await response.json();

    return (
        <div>
            <div className="mt-20 space-y-7">
            <h3>All Events</h3>
                <ul className="events">
                    {events && events.length > 0 && events.map((event: IEvent) => (
                        <li key={event.title}>
                            <EventCard {...event} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
export default Page
