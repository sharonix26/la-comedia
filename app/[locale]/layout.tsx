import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales, type Locale } from "../../src/i18n";
import { SparklesCore } from "@/components/ui/shadcn-io/sparkles";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Comedy Bar",
  description:
    "Live stand-up, open mics, and specials in a velvet-red stage vibe.",
  metadataBase: new URL("http://localhost:3000"),
  openGraph: {
    title: "Comedy Bar",
    description: "Live stand-up, open mics, and specials.",
    url: "/",
    siteName: "Comedy Bar Valencia",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Comedy Bar",
    description: "Live stand-up, open mics, and specials.",
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type RootLayoutProps = {
  children: React.ReactNode;
  // ⬇ IMPORTANT: params is a Promise in Next 16
  params: Promise<{ locale: Locale }>;
};

export default async function RootLayout({ children, params }: RootLayoutProps) {
  // ⬇ unwrap params
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  // Use next-intl's server functions to get messages
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white relative`}
      >
        {/* Full-page Sparkles Background */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <SparklesCore
            id="page-sparkles"
            background="transparent"
            minSize={1}
            maxSize={2}
            particleDensity={100}
            particleColor="#ffffff"
            speed={6}
            className="h-full w-full"
          />
        </div>

        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar />
          <div className="pt-20 relative z-10">{children}</div>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
