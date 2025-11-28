"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { useTranslations } from "next-intl";
import { useParams, usePathname, useRouter } from "next/navigation";
import { MapPin } from "lucide-react";

type Locale = "en" | "es" | "ru" | "ua";
const LOCALES: Locale[] = ["en", "es", "ru", "ua"];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const t = useTranslations("Navbar");

  const params = useParams<{ locale: Locale }>();
  const pathname = usePathname();
  const router = useRouter();

  const locale: Locale = (params?.locale ?? "en") as Locale;
  const base = `/${locale}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function changeLocale(nextLocale: Locale) {
    if (nextLocale === locale) return;

    const segments = pathname.split("/"); // ["", "en", "events"...]
    if (segments.length > 1) {
      segments[1] = nextLocale;
    } else {
      segments.push(nextLocale);
    }
    const newPath = segments.join("/") || "/";
    router.push(newPath);
    setOpen(false);
  }

  return (
    <nav className="fixed inset-x-0 top-0 z-50 font-semibold tracking-wide">
      {/* main bar */}
      <motion.div
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`relative flex h-16 items-center justify-between px-4 md:px-8
          overflow-visible transition-all duration-500 backdrop-blur-md
          ${
            scrolled
              ? "bg-gradient-to-b from-[#180004]/95 via-[#120002]/90 to-[#080001]/80 shadow-[0_0_30px_rgba(255,0,60,0.25)]"
              : "bg-gradient-to-b from-[#250006]/95 via-[#180004]/90 to-[#0a0001]/80"
          }`}
      >
        {/* LEFT: nav links (desktop) */}
        <div className="hidden md:flex items-center gap-8">
          <Link href={`${base}#events`} className="nav-link">
            {t("events")}
          </Link>
          <Link href={`${base}/performers`} className="nav-link">
            {t("performers")}
          </Link>
          <Link href={`${base}#about`} className="nav-link">
            {t("about")}
          </Link>
          <Link href={`${base}/contact`} className="nav-link">
            {t("contact")}
          </Link>
        </div>

        {/* CENTER: floating logo (clickable, goes to home) */}
        <div className="pointer-events-auto absolute left-1/2 top-16.5 -translate-x-1/2 -translate-y-1/2 md:block z-40">
          <div className="relative">
            <Link href={base} className="inline-flex items-center">
              <Image
                src="/lacomedialogo.png"
                alt="Comedy Bar Logo"
                width={160}
                height={160}
                priority
                className="drop-shadow-[0_0_12px_rgba(255,0,60,0.55)]"
              />
            </Link>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-[61px]" />
          </div>
        </div>

        {/* RIGHT: language + CTA (desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <LanguageMenu currentLocale={locale} onChange={changeLocale} />
          <Link
            href={`${base}#location`}
            className="inline-flex items-center gap-2 rounded-md bg-[#ff003c] px-5 py-2.5 text-white font-semibold
                       shadow-[0_0_12px_rgba(255,0,60,0.7)] hover:shadow-[0_0_20px_rgba(255,0,60,0.9)]
                       hover:bg-[#ff174f] transition-all"
          >
            <MapPin className="h-4 w-4" />
            {t("findUs")}
          </Link>
        </div>

        {/* burger (mobile) */}
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center"
        >
          <div className="relative h-4 w-6">
            <span
              className={`absolute left-0 top-0 h-0.5 w-6 bg-[#ff003c] transition ${
                open ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-2 h-0.5 w-6 bg-[#ff003c] transition ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-4 h-0.5 w-6 bg-[#ff003c] transition ${
                open ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </div>
        </button>

        {/* downward glow – behind logo */}
        <div className="pointer-events-none absolute left-0 top-full h-10 w-full bg-gradient-to-b from-[#ff003c]/30 via-transparent to-transparent blur-sm z-10" />
      </motion.div>

      {/* mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="md:hidden bg-gradient-to-b from-[#250006]/95 via-[#120002]/90 to-[#0a0001]/90 border-t border-[#ff003c]/20 backdrop-blur-sm"
          >
            <div className="flex flex-col items-center gap-5 py-5 text-lg">
              <Link
                href={`${base}#events`}
                onClick={() => setOpen(false)}
                className="nav-link"
              >
                {t("events")}
              </Link>
              <Link
                href={`${base}/performers`}
                onClick={() => setOpen(false)}
                className="nav-link"
              >
                {t("performers")}
              </Link>
              <Link
                href={`${base}#about`}
                onClick={() => setOpen(false)}
                className="nav-link"
              >
                {t("about")}
              </Link>
              <Link
                href={`${base}/contact`}
                onClick={() => setOpen(false)}
                className="nav-link"
              >
                {t("contact")}
              </Link>

              {/* mobile language choices */}
              <div className="flex gap-3 text-sm text-white/80">
                {LOCALES.map((code) => (
                  <button
                    key={code}
                    onClick={() => changeLocale(code)}
                    className={`px-2 py-1 rounded ${
                      code === locale ? "bg-white/20" : "bg-white/5"
                    }`}
                  >
                    {code.toUpperCase()}
                  </button>
                ))}
              </div>

              <Link
                href={`${base}#location`}
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-2 rounded-md bg-[#ff003c] px-5 py-2.5 text-white font-semibold
                           shadow-[0_0_12px_rgba(255,0,60,0.7)] hover:shadow-[0_0_20px_rgba(255,0,60,0.9)]
                           hover:bg-[#ff174f] transition-all"
              >
                <MapPin className="h-4 w-4" />
                {t("findUs")}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* link styles */}
      <style jsx global>{`
        .nav-link {
          color: rgba(255, 255, 255, 0.85);
          font-weight: 600;
          position: relative;
          transition: color 0.3s, text-shadow 0.3s;
        }
        .nav-link::after {
          content: "";
          position: absolute;
          bottom: -4px;
          left: 50%;
          transform: translateX(-50%);
          width: 0%;
          height: 2px;
          background-color: #ff003c;
          box-shadow: 0 0 8px rgba(255, 0, 60, 0.8);
          transition: width 0.3s ease;
        }
        .nav-link:hover {
          color: #ff003c;
          text-shadow: 0 0 6px rgba(255, 0, 60, 0.8);
        }
        .nav-link:hover::after {
          width: 100%;
        }
      `}</style>
    </nav>
  );
}

/** Language dropdown (desktop) */
function LanguageMenu({
  currentLocale,
  onChange,
}: {
  currentLocale: Locale;
  onChange: (loc: Locale) => void;
}) {
  const [open, setOpen] = useState(false);

  const label = currentLocale.toUpperCase();

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-md bg-white/5 px-3 py-2 text-white/90 hover:bg-white/10 transition"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span className="text-sm">{label}</span>
        <svg
          viewBox="0 0 20 20"
          className="h-4 w-4"
          fill="currentColor"
          aria-hidden
        >
          <path d="M5.5 7.5l4.5 4.5 4.5-4.5" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-36 overflow-hidden rounded-md border border-white/10 bg-[#0b0002] text-sm shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
            role="menu"
          >
            {LOCALES.map((code) => (
              <li key={code}>
                <button
                  onClick={() => {
                    onChange(code);
                    setOpen(false);
                  }}
                  className={`w-full px-3 py-2 text-left text-white/85 hover:bg-white/5 hover:text-white ${
                    code === currentLocale ? "bg-white/10" : ""
                  }`}
                  role="menuitem"
                >
                  {code.toUpperCase()}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
