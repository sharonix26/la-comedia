"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, X } from "lucide-react";

// --------------------
// Define Event type
// --------------------
interface EventItem {
  id: string;
  title: string;
  description?: string;
  dateTime: string | Date;
  tag?: string;
  posterUrl?: string;
  ticketsUrl?: string;
}

export default function EventsClient({ events }: { events: EventItem[] }) {
  const [activeEvent, setActiveEvent] = useState<EventItem | null>(null);

  return (
    <section
      id="events"
      className="relative mx-auto max-w-6xl px-6 py-10 md:py-12 scroll-mt-24 z-10"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-3xl md:rounded-[2rem]">
        <Image
          src="/bg/crowd.jpg"
          alt="Crowd clapping at La Comedia"
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Header */}
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

      {/* EVENTS GRID */}
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {events.map((event: EventItem) => (
          <article
            key={event.id}
            onClick={() => setActiveEvent(event)}
            className="group flex cursor-pointer flex-col overflow-hidden rounded-xl border border-white/10 bg-black/30 shadow-[0_0_20px_rgba(0,0,0,0.6)] backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#ff1e1e] hover:shadow-[0_0_28px_rgba(255,30,30,0.7)]"
          >
            <div className="relative h-40 w-full overflow-hidden">
              <Image
                src={event.posterUrl || "/events/default.jpg"}
                alt={event.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105 group-hover:brightness-[1.08]"
              />
              {event.tag && (
                <span className="absolute left-2 top-2 rounded-full bg-black/80 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/90">
                  {event.tag}
                </span>
              )}
            </div>

            <div className="flex flex-1 flex-col p-4">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-sm md:text-base font-semibold leading-snug">
                  {event.title}
                </h3>
                <span className="whitespace-nowrap text-[0.7rem] font-medium uppercase tracking-[0.18em] text-white/60">
                  {new Date(event.dateTime).toLocaleString("es-ES", {
                    weekday: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                    day: "2-digit",
                    month: "short",
                  })}
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
                  href={event.ticketsUrl || "#"}
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

      {/* MODAL */}
      {activeEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
          onClick={() => setActiveEvent(null)}
        >
          <div
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/20 bg-black/90 shadow-[0_0_40px_rgba(0,0,0,0.9)] backdrop-blur-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveEvent(null)}
              className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex flex-col md:flex-row">
              <div className="relative h-52 w-full md:h-auto md:w-1/2">
                <Image
                  src={activeEvent.posterUrl || "/events/default.jpg"}
                  alt={activeEvent.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex w-full flex-col gap-3 p-5 md:w-1/2">
                <p className="text-xs uppercase tracking-[0.22em] text-white/60">
                  {activeEvent.tag || "La Comedia"}
                </p>
                <h3 className="text-lg font-semibold leading-snug">
                  {activeEvent.title}
                </h3>

                <p className="text-sm font-medium uppercase tracking-[0.18em] text-white/70">
                  {new Date(activeEvent.dateTime).toLocaleString("es-ES", {
                    weekday: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                    day: "2-digit",
                    month: "short",
                  })}
                </p>

                {activeEvent.description && (
                  <p className="mt-1 text-sm text-white/80">
                    {activeEvent.description}
                  </p>
                )}

                <div className="mt-3 flex flex-wrap gap-2">
                  <a
                    href={activeEvent.ticketsUrl || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[#ff1e1e] to-[#b80000] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white"
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
