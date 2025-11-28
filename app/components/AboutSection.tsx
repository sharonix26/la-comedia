"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

type Locale = "en" | "es" | "ru" | "ua";

export default function AboutSection() {
  const t = useTranslations("About");
  const params = useParams<{ locale: Locale }>();
  const locale = (params?.locale ?? "en") as Locale;

  const performersHref = `/${locale}/performers`;

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="about"
      className="relative py-14 sm:py-18 lg:py-20 text-white"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.header
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          variants={fadeUp}
          className="max-w-3xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6b8a]">
            {t("eyebrow")}
          </p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-sm text-white/70 sm:text-base">
            {t("tagline")}
          </p>
        </motion.header>

        <div className="mt-8 sm:mt-10 space-y-8 sm:space-y-10">
          {/* Card 1 – Image on the RIGHT */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            variants={fadeUp}
            className="rounded-3xl border border-[#ff003c]/25 bg-gradient-to-br from-black/55 via-[#200005]/65 to-black/80 p-5 sm:p-7 lg:p-8 shadow-[0_24px_70px_rgba(0,0,0,0.95)] backdrop-blur-xl"
          >
            <div className="grid gap-6 md:grid-cols-2 md:items-center">
              {/* Text */}
              <div className="space-y-3 text-sm text-white/75 sm:text-base">
                <p>{t("intro")}</p>

                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ff6b8a] sm:text-sm">
                    {t("highlightsTitle")}
                  </h3>
                  <ul className="mt-2 space-y-1.5">
                    <li>• {t("highlight1")}</li>
                    <li>• {t("highlight2")}</li>
                    <li>• {t("highlight3")}</li>
                    <li>• {t("highlight4")}</li>
                  </ul>
                </div>
              </div>

              {/* Image right */}
              <div className="relative h-52 overflow-hidden rounded-3xl border border-white/10 bg-black/40 sm:h-64 lg:h-72">
                <Image
                  src="/images/la-comedia-bar-2.jpg"
                  alt={t("image1Alt")}
                  fill
                  className="object-cover object-center"
                  sizes="(min-width: 1024px) 480px, (min-width: 768px) 50vw, 100vw"
                />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#ff003c]/35 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>

          {/* Card 2 – Image on the LEFT */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            variants={fadeUp}
            className="rounded-3xl border border-[#ff003c]/25 bg-gradient-to-br from-black/55 via-[#1a0004]/65 to-black/80 p-5 sm:p-7 lg:p-8 shadow-[0_24px_70px_rgba(0,0,0,0.95)] backdrop-blur-xl"
          >
            <div className="grid gap-6 md:grid-cols-2 md:items-center">
              {/* Image left on desktop, first on mobile */}
              <div className="relative order-1 h-52 overflow-hidden rounded-3xl border border-white/10 bg-black/40 sm:h-64 lg:h-72 md:order-none">
                <Image
                  src="/images/la-comedia-bar-1.jpg"
                  alt={t("image2Alt")}
                  fill
                  className="object-cover object-center"
                  sizes="(min-width: 1024px) 480px, (min-width: 768px) 50vw, 100vw"
                />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#ff003c]/35 via-transparent to-transparent" />
              </div>

              {/* Text */}
              <div className="space-y-3 text-sm text-white/75 sm:text-base">
                <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ff6b8a] sm:text-sm">
                  {t("nightsTitle")}
                </h3>
                <p>{t("nightsText")}</p>
                <ul className="mt-1 space-y-1.5">
                  <li>• {t("nightsList1")}</li>
                  <li>• {t("nightsList2")}</li>
                  <li>• {t("nightsList3")}</li>
                  <li>• {t("nightsList4")}</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* CTA Card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            variants={fadeUp}
            className="rounded-3xl border border-[#ff003c]/40 bg-gradient-to-r from-[#250006]/95 via-[#140003]/95 to-[#2e0010]/90 px-5 py-4 text-center shadow-[0_20px_60px_rgba(0,0,0,0.95)] backdrop-blur-xl sm:flex sm:items-center sm:justify-between sm:px-7 sm:py-5 sm:text-left"
          >
            <p className="max-w-xl text-sm text-white/80 sm:text-base">
              {t("collabText")}
            </p>

            <div className="mt-3 flex justify-center sm:mt-0 sm:justify-end">
              <Link
                href={performersHref}
                className="inline-flex items-center justify-center rounded-md bg-[#ff003c] px-5 py-2 text-white font-semibold
                           text-xs tracking-[0.18em] uppercase
                           shadow-[0_0_14px_rgba(255,0,60,0.8)]
                           hover:bg-[#ff174f]
                           hover:shadow-[0_0_22px_rgba(255,0,60,1)]
                           transition-all sm:text-sm"
              >
                {t("cta")}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
