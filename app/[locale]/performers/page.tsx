import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Perform at La Comedia | Stand-Up Comedy Stage in Valencia",
  description:
    "Apply to perform at La Comedia stand up bar in Valencia. Professional and emerging stand-up comedians can submit their details, clips and availability directly through this page.",
  openGraph: {
    title: "Perform at La Comedia | Stand-Up Comedy Stage in Valencia",
    description:
      "Stand-up comedians can apply to perform at La Comedia in Valencia. Submit your bio, links and availability and our team will get back to you.",
    type: "website",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Who can apply to perform at La Comedia?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We welcome professional comedians, touring acts and serious emerging stand-up performers with prepared material and a solid stage presence.",
      },
    },
    {
      "@type": "Question",
      name: "In which languages can I perform?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We host sets in Spanish, English and occasionally mixed or multilingual nights. Simply indicate the languages you perform in when you apply.",
      },
    },
    {
      "@type": "Question",
      name: "What should I include in my application?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Please include your full name, stage name, links to performance clips or social media, your preferred set length, languages and your availability.",
      },
    },
  ],
};

export default function PerformersPage() {
  return (
    <>
      {/* SEO structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <main className="min-h-screen bg-black text-white pt-28 pb-16">
        {/* HERO */}
        <section className="mx-auto max-w-5xl px-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#ff003c]/40 bg-[#1a0005] px-4 py-1 text-xs uppercase tracking-[0.2em] text-[#ff668f]">
            For comedians & agents
          </div>

          <div className="mt-5 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
                Perform at{" "}
                <span className="text-[#ff003c]">La Comedia</span> stand up bar
              </h1>
              <p className="mt-3 max-w-2xl text-sm md:text-base text-white/70 leading-relaxed">
                La Comedia is an intimate stand-up room in Algirós, Valencia.
                We collaborate with local and international comedians for
                curated nights, open mics and special shows. If you want to
                bring your material to our stage, apply below.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 text-xs md:text-sm">
              <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                <p className="text-[10px] uppercase text-white/50">Location</p>
                <p className="font-semibold">
                  C/ Campoamor 59
                  <br />
                  Algirós, Valencia
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                <p className="text-[10px] uppercase text-white/50">Formats</p>
                <p className="font-semibold">
                  Stand-up
                  <br />
                  Showcases & specials
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                <p className="text-[10px] uppercase text-white/50">
                  Languages
                </p>
                <p className="font-semibold">
                  ES / EN
                  <br />
                  Multilingual nights
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* INFO BLOCKS */}
        <section className="mx-auto mt-12 max-w-5xl px-6 grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#1b0006] to-[#070007] p-6">
            <h2 className="text-lg font-semibold">Who this page is for</h2>
            <p className="mt-2 text-sm text-white/70 leading-relaxed">
              This application is for comedians and agencies who want to:
            </p>
            <ul className="mt-3 space-y-2 text-sm text-white/80 leading-relaxed">
              <li>• Perform a solo or shared stand-up set at La Comedia.</li>
              <li>• Bring a tour date or special show to Valencia.</li>
              <li>• Test new material in a real club environment.</li>
              <li>• Pitch a specific format (roast, crowd-work, themed night).</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#14000a] to-[#050007] p-6">
            <h2 className="text-lg font-semibold">What you can expect</h2>
            <ul className="mt-3 space-y-2 text-sm text-white/80 leading-relaxed">
              <li>• Intimate room designed for stand-up, not background noise.</li>
              <li>• Professional sound, stage lighting and bar service.</li>
              <li>• Promotion through our social channels and website.</li>
              <li>• Flexible formats: spots, full nights, or co-productions.</li>
            </ul>
            <p className="mt-3 text-xs text-white/55">
              Fees, profit split and conditions depend on the format
              (headliner, showcase, open mic, special event) and will be agreed
              individually.
            </p>
          </div>
        </section>

        {/* APPLICATION FORM */}
        <section className="mx-auto mt-14 max-w-5xl px-6">
          <div className="rounded-2xl border border-[#ff003c]/35 bg-gradient-to-b from-[#20000b] via-[#110008] to-[#050006] p-6 md:p-8 shadow-[0_0_40px_rgba(255,0,60,0.25)]">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-xl md:text-2xl font-semibold">
                  Application form for performers
                </h2>
                <p className="mt-2 text-sm text-white/75 max-w-xl">
                  Fill this form as completely as you can. The more context we
                  have, the easier it is to place you in the right night and
                  format.
                </p>
              </div>
              <p className="text-xs text-white/60">
                Fields marked with <span className="text-[#ff668f]">*</span>{" "}
                are required.
              </p>
            </div>

            {/* For now: pure HTML form (no event handlers in this Server Component) */}
            <form
              className="mt-6 grid gap-5 md:grid-cols-2"
              method="POST"
              action="#"
            >
              {/* LEFT COLUMN */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-white/60">
                    Full name <span className="text-[#ff668f]">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    className="mt-1 w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm outline-none focus:border-[#ff003c] focus:ring-1 focus:ring-[#ff003c]"
                    placeholder="e.g. Laura García"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-white/60">
                    Stage name
                  </label>
                  <input
                    type="text"
                    name="stageName"
                    className="mt-1 w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm outline-none focus:border-[#ff003c] focus:ring-1 focus:ring-[#ff003c]"
                    placeholder="If different from full name"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-white/60">
                    Email <span className="text-[#ff668f]">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="mt-1 w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm outline-none focus:border-[#ff003c] focus:ring-1 focus:ring-[#ff003c]"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-white/60">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    className="mt-1 w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm outline-none focus:border-[#ff003c] focus:ring-1 focus:ring-[#ff003c]"
                    placeholder="+34 ..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-white/60">
                    City & country
                  </label>
                  <input
                    type="text"
                    name="city"
                    className="mt-1 w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm outline-none focus:border-[#ff003c] focus:ring-1 focus:ring-[#ff003c]"
                    placeholder="e.g. Valencia, Spain"
                  />
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-white/60">
                    Languages you perform in{" "}
                    <span className="text-[#ff668f]">*</span>
                  </label>
                  <input
                    type="text"
                    name="languages"
                    required
                    className="mt-1 w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm outline-none focus:border-[#ff003c] focus:ring-1 focus:ring-[#ff003c]"
                    placeholder="e.g. Spanish, English"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-white/60">
                    Links (clips / Instagram / YouTube){" "}
                    <span className="text-[#ff668f]">*</span>
                  </label>
                  <textarea
                    name="links"
                    required
                    rows={3}
                    className="mt-1 w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm outline-none focus:border-[#ff003c] focus:ring-1 focus:ring-[#ff003c]"
                    placeholder="Paste 1–3 links so we can see you on stage."
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-white/60">
                      Experience level
                    </label>
                    <select
                      name="experience"
                      className="mt-1 w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm outline-none focus:border-[#ff003c] focus:ring-1 focus:ring-[#ff003c]"
                    >
                      <option value="">Select…</option>
                      <option value="emerging">Emerging</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="pro">Professional</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-white/60">
                      Preferred set length
                    </label>
                    <input
                      type="text"
                      name="setLength"
                      className="mt-1 w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm outline-none focus:border-[#ff003c] focus:ring-1 focus:ring-[#ff003c]"
                      placeholder="e.g. 10–15 min"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-white/60">
                    Availability / dates
                  </label>
                  <input
                    type="text"
                    name="availability"
                    className="mt-1 w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm outline-none focus:border-[#ff003c] focus:ring-1 focus:ring-[#ff003c]"
                    placeholder="Weekdays, weekends, specific dates…"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-white/60">
                    Any notes or specific show idea?
                  </label>
                  <textarea
                    name="notes"
                    rows={3}
                    className="mt-1 w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm outline-none focus:border-[#ff003c] focus:ring-1 focus:ring-[#ff003c]"
                    placeholder="Tell us if you’re pitching a special format, tour date, or anything we should know."
                  />
                </div>
              </div>

              {/* FULL-WIDTH FOOTER AREA */}
              <div className="md:col-span-2 mt-2 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <label className="flex items-start gap-2 text-xs text-white/65">
                  <input
                    type="checkbox"
                    required
                    className="mt-0.5 h-3.5 w-3.5 rounded border border-white/40 bg-black/60"
                  />
                  <span>
                    I agree that La Comedia may contact me regarding my
                    application and keep my details on file for future shows.
                  </span>
                </label>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-md bg-[#ff003c] px-6 py-2.5 text-sm font-semibold text-white shadow-[0_0_18px_rgba(255,0,60,0.7)] hover:shadow-[0_0_26px_rgba(255,0,60,0.9)] transition"
                >
                  Submit application
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
