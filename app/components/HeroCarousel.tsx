"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

import "swiper/css";
import "swiper/css/pagination";

// 🔹 same Locale type we used in Navbar
type Locale = "en" | "es" | "ru" | "ua";

const SLIDES = [
  { src: "/hero/img1.jpg", alt: "Stand-up on stage" },
  { src: "/hero/img2.jpg", alt: "Audience laughing" },
  { src: "/hero/img3.jpg", alt: "Vintage microphone" },
  { src: "/hero/img4.jpg", alt: "Red velvet curtains" },
  { src: "/hero/img5.jpg", alt: "Crowd at tables" }
];

export default function HeroCarousel() {
  // 🔹 translations from "HeroCarousel" namespace in JSON
  const t = useTranslations("HeroCarousel");

  // 🔹 get current locale from URL: /en, /es, /ru, /ua
  const params = useParams<{ locale: Locale }>();
  const locale: Locale = (params?.locale ?? "en") as Locale;

  const performersHref = `/${locale}/performers`;

  return (
    <section
      className="relative w-full overflow-hidden bg-black/90 backdrop-blur-sm z-10"
      aria-label="Hero carousel"
    >
      <Swiper
        modules={[Autoplay, Pagination]}
        loop
        lazyPreloadPrevNext={2}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        pagination={{ clickable: true }}
        slidesPerView={1}
        speed={700}
        className="h-[70vh] min-h-[420px] sm:h-[78vh] lg:h-[86vh]"
      >
        {SLIDES.map((s) => (
          <SwiperSlide key={s.src}>
            <div className="relative h-full w-full">
              <Image
                src={s.src}
                alt={s.alt}
                fill
                priority={false}
                sizes="100vw"
                className="object-cover"
              />
              {/* gradient overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/70" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Tagline – centered above the button */}
      <div className="pointer-events-none absolute inset-0 z-20 flex items-end justify-center pb-20 sm:pb-24">
        <p className="px-4 text-center text-sm sm:text-lg md:text-xl font-semibold tracking-[0.25em] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          {t("tagline")}
        </p>
      </div>

      {/* Floating Retro Red Button with stronger hover glow */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 z-30 flex justify-center">
        <motion.a
          href="#events"
          className="
            pointer-events-auto
            inline-flex items-center gap-2
            px-8 py-3
            rounded-full text-sm md:text-base font-semibold
            text-white
            bg-gradient-to-r from-[#ff1e1e]/55 to-[#b80000]/55
            backdrop-blur-sm
            border border-white/10
            shadow-[0_0_18px_rgba(255,30,30,0.4)]
            transition-all duration-300
            hover:shadow-[0_0_40px_rgba(255,60,60,1)]
            hover:bg-gradient-to-r hover:from-[#ff2b2b]/75 hover:to-[#8f0000]/75
            hover:scale-[1.07]
          "
          animate={{ y: [0, 4, 0] }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {t("cta")}
          <ArrowDown className="h-4 w-4" />
        </motion.a>
      </div>
    </section>
  );
}
