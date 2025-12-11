import { prisma } from "@/lib/prisma";
import EventsClient from "./UpcomingEventsClient";

export default async function UpcomingEventsSection() {
  const events = await prisma.event.findMany({
    where: { isPublished: true },
    orderBy: { dateTime: "asc" },
  });

  return <EventsClient events={events} />;
}
