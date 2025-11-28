"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, X } from "lucide-react";

// ---- BACKLOG DATA MODEL (easy to swap to CMS/API later) ----

type EventItem = {
  id: string;
  title: string;
  date: string;        // "Thu • 21:30"
  tag?: string;        // "Stand-up", "Karaoke", etc.
  imageSrc: string;    // poster path in /public/events
  imageAlt: string;
  ticketsUrl: string;  // external URL
  description?: string;
  lineup?: string;
};

const UPCOMING_EVENTS: EventItem[] = [
  {
    id: "open-mic-thu",
    title: "Open Mic Thursday",
    date: "Thu • 21:30",
    tag: "Stand-up",
    imageSrc: "/events/open-mic.jpg",
    imageAlt: "Comedian on stage during open mic night",
    ticketsUrl: "https://tickets.example.com/open-mic-thursday",
    description:
      "Raw, unfiltered stand-up. New comics, wild stories and zero guarantees.",
    lineup: "Open sign-up • 5 min per comic • Hosted by La Comedia crew.",
  },
  {
    id: "karaoke-frenzy",
    title: "Karaoke Frenzy Night",
    date: "Fri • 23:00",
    tag: "Karaoke",
    imageSrc: "/events/karaoke.jpg",
    imageAlt: "People singing karaoke at the bar",
    ticketsUrl: "https://tickets.example.com/karaoke-frenzy",
    description:
      "Sing badly, win loudly. The most chaotic karaoke in Valencia.",
    lineup: "DJ + screen lyrics • Shots for the bravest performances.",
  },
  {
    id: "spanish-comedy",
    title: "Spanish Comedy Showcase",
    date: "Sat • 21:00",
    tag: "Stand-up ES",
    imageSrc: "/events/spanish-comedy.jpg",
    imageAlt: "Spanish comedian performing on stage",
    ticketsUrl: "https://tickets.example.com/spanish-comedy",
    description:
      "Top local comics dropping fresh material en español.",
    lineup: "4–5 comedians • 10–15 min sets • Hosted night.",
  },
  {
    id: "english-night",
    title: "Comedy Night in English",
    date: "Sun • 20:30",
    tag: "Stand-up EN",
    imageSrc: "/events/english-comedy.jpg",
    imageAlt: "English stand-up night poster",
    ticketsUrl: "https://tickets.example.com/english-night",
    description:
      "All-English stand-up for expats, tourists and brave locals.",
    lineup: "Mixed international lineup • 90 min show.",
  },
  {
    id: "improv-jam",
    title: "Improv Jam Session",
    date: "Wed • 21:00",
    tag: "Improv",
    imageSrc: "/events/improv.jpg",
    imageAlt: "Improv group playing on stage",
    ticketsUrl: "https://tickets.example.com/improv-jam",
    description:
      "No script, no plan, just pure chaos. You shout, they play.",
    lineup: "Improv troupe + guest players • Audience suggestions.",
  },
  {
    id: "latin-night",
    title: "Latin Music & Laughs",
    date: "Fri • 22:00",
    tag: "Special",
    imageSrc: "/events/latin-night.jpg",
    imageAlt: "Crowd enjoying latin music and comedy",
    ticketsUrl: "https://tickets.example.com/latin-night",
    description:
      "Spanglish jokes, reggaeton breaks and way too much energy.",
    lineup: "Comics + DJ • Mixed Spanish/English sets.",
  },
  {
    id: "new-talent",
    title: "New Talent Night",
    date: "Sat • 19:30",
    tag: "Rookie",
    imageSrc: "/events/new-talent.jpg",
    imageAlt: "New comedians on stage",
    ticketsUrl: "https://tickets.example.com/new-talent",
    description:
      "Fresh faces, first sets and future killers of the scene.",
    lineup: "New comics + a pro host to keep it together.",
  },
  {
    id: "late-night-madness",
    title: "Late Night Madness",
    date: "Sat • 00:00",
    tag: "After-hours",
    imageSrc: "/events/late-night.jpg",
    imageAlt: "Late night crowd at La Comedia",
    ticketsUrl: "https://tickets.example.com/late-night-madness",
    description:
      "Late show where anything goes and nobody’s sober.",
    lineup: "Drop-in sets • Surprise guests • Crowd work heavy.",
  },
];

// ---- COMPONENT ----

export default function UpcomingEventsSection() {
  const [activeEvent, setActiveEvent] = useState<EventItem | null>(null);

  return (
    <section
      id="events"
      className="relative mx-auto max-w-6xl px-6 py-16 md:py-24 scroll-mt-24 min-h-[600px] z-10"
    >
      {/* Background crowd image */}
      <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden rounded-3xl md:rounded-[2rem]">
        <Image
          src="/bg/crowd.jpg" // put a crowd image in /public/bg/crowd.jpg
          alt="Crowd clapping at La Comedia"
          fill
          className="object-cover opacity-30"
        />
      </div>

      {/* Background crowd image + dark overlay */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-3xl md:rounded-[2rem]">
        <Image
          src="/bg/crowd.jpg" // put a crowd image in /public/bg/crowd.jpg
          alt="Crowd clapping at La Comedia"
          fill
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/85 to-black" />
      </div>

      {/* Section header */}
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Upcoming at La Comedia
          </h2>
          <p className="mt-2 max-w-xl text-sm md:text-base text-white/70">
            Lock in your night. Pick a show, grab your crew, and jump straight
            to tickets.
          </p>
        </div>
        <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-white/40">
          C. de Campoamor 59 • Valencia
        </p>
      </div>

      {/* 4 × 2 grid gallery */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {UPCOMING_EVENTS.map((event) => (
          <article
            key={event.id}
            onClick={() => setActiveEvent(event)}
            className="
              group flex cursor-pointer flex-col overflow-hidden
              rounded-xl border border-white/10 bg-black/40
              shadow-[0_0_20px_rgba(0,0,0,0.6)] backdrop-blur-sm
              transition-all duration-200
              hover:-translate-y-1
              hover:border-[#ff1e1e]
              hover:shadow-[0_0_28px_rgba(255,30,30,0.7)]
            "
          >
            {/* Poster */}
            <div className="relative h-40 w-full overflow-hidden">
              <Image
                src={event.imageSrc}
                alt={event.imageAlt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105 group-hover:brightness-[1.08]"
              />
              {event.tag && (
                <span className="absolute left-2 top-2 rounded-full bg-black/80 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/90">
                  {event.tag}
                </span>
              )}
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-4">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-sm md:text-base font-semibold leading-snug">
                  {event.title}
                </h3>
                <span className="whitespace-nowrap text-[0.7rem] font-medium uppercase tracking-[0.18em] text-white/60">
                  {event.date}
                </span>
              </div>

              <div className="mt-4 flex justify-between gap-3">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveEvent(event);
                  }}
                  className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-white/60 underline-offset-4 hover:text-white hover:underline"
                >
                  More info
                </button>

                <a
                  href={event.ticketsUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1 rounded-full border border-white/40 bg-white/10 px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-white/90 transition-colors hover:border-white hover:bg-white/20"
                >
                  Buy tickets
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Modal popup for event details */}
      {activeEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
          onClick={() => setActiveEvent(null)}
        >
          <div
            className="
              relative w-full max-w-lg overflow-hidden
              rounded-2xl border border-white/20 bg-black/90
              shadow-[0_0_40px_rgba(0,0,0,0.9)] backdrop-blur-xl
            "
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setActiveEvent(null)}
              className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex flex-col md:flex-row">
              {/* Poster in modal */}
              <div className="relative h-52 w-full md:h-auto md:w-1/2">
                <Image
                  src={activeEvent.imageSrc}
                  alt={activeEvent.imageAlt}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Text content */}
              <div className="flex w-full flex-col gap-3 p-5 md:w-1/2">
                <p className="text-xs uppercase tracking-[0.22em] text-white/60">
                  {activeEvent.tag || "La Comedia"}
                </p>
                <h3 className="text-lg font-semibold leading-snug">
                  {activeEvent.title}
                </h3>
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-white/70">
                  {activeEvent.date}
                </p>

                {activeEvent.description && (
                  <p className="mt-1 text-sm text-white/80">
                    {activeEvent.description}
                  </p>
                )}

                {activeEvent.lineup && (
                  <p className="text-xs text-white/60">
                    <span className="font-semibold">Lineup:</span>{" "}
                    {activeEvent.lineup}
                  </p>
                )}

                <div className="mt-3 flex flex-wrap gap-2">
                  <a
                    href={activeEvent.ticketsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      inline-flex items-center gap-1 rounded-full
                      bg-gradient-to-r from-[#ff1e1e] to-[#b80000]
                      px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em]
                      text-white shadow-[0_0_24px_rgba(255,30,30,0.7)]
                      transition-transform hover:scale-[1.04]
                    "
                  >
                    Buy tickets
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                  <button
                    type="button"
                    onClick={() => setActiveEvent(null)}
                    className="text-xs font-semibold uppercase tracking-[0.16em] text-white/60 hover:text-white"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
