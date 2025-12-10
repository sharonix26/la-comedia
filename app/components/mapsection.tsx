"use client";

import { useTranslations } from "next-intl";

export default function MapSection() {
  const t = useTranslations("MapSection");

  return (
    <section
      id="location"
      className="w-full py-10 relative z-10 scroll-mt-24"
    >
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-start rounded-3xl border border-white/12 bg-black/20 backdrop-blur-sm px-6 py-7 md:px-8 md:py-8">
          {/* Left: text / address */}
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">
              {t("title")}
            </h2>
            <p className="mt-3 text-white/70">
              {t("description")}
            </p>

            <div className="mt-5 space-y-2 text-sm md:text-base">
              <p className="font-medium">{t("addressLabel")}</p>
              <p className="text-white/80">
                {t("addressName")}
                <br />
                {t("addressStreet")}
                <br />
                {t("addressCity")}
              </p>
            </div>

            <a
              href="https://www.google.com/maps?q=La+Comedia+stand+up+bar,+C+de+Campoamor,+59,+Algir%C3%B3s,+46022+Val%C3%A8ncia,+Valencia"
              target="_blank"
              rel="noreferrer"
              className="inline-flex mt-6 items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-sm font-medium hover:border-white hover:bg-white/5 transition"
            >
              {t("openInMaps")}
            </a>
          </div>

          {/* Right: embedded map */}
          <div className="h-72 md:h-80 w-full overflow-hidden rounded-xl border border-white/10 shadow-lg bg-black/20">
            <iframe
              title={t("iframeTitle")}
              src="https://www.google.com/maps?q=La+Comedia+stand+up+bar,+C+de+Campoamor,+59,+Algir%C3%B3s,+46022+Val%C3%A8ncia,+Valencia&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full border-0"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
