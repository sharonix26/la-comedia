"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/10 bg-black/90 backdrop-blur-sm text-white z-10">
      {/* upward glow under footer edge */}
      <div className="pointer-events-none absolute -top-6 left-0 h-6 w-full bg-linear-to-t from-[#ff003c33] via-[#ff003c1a] to-transparent blur-sm" />

      <div className="mx-auto max-w-7xl px-6 py-14 md:px-10">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-extrabold tracking-wide text-[#ff003c] drop-shadow-[0_0_8px_rgba(255,0,60,0.6)]">
              COMEDY <span className="text-white">BAR</span>
            </h3>
            <p className="mt-3 text-sm text-white/70">
              Live stand-up, open mics, and specials. Velvet vibes, neon nights.
            </p>
          </div>

          {/* Visit */}
          <div>
            <h4 className="footer-heading">Visit</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="https://maps.google.com" target="_blank" className="footer-link">
                  123 Velvet St, Valencia
                </Link>
              </li>
              <li className="text-white/70">Thu–Sun · 18:00–02:00</li>
              <li>
                <Link href="/about" className="footer-link">About the venue</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="footer-heading">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="mailto:hello@comedybar.com" className="footer-link">
                  hello@comedybar.com
                </Link>
              </li>
              <li className="text-white/80">+34 600 000 000</li>
              <li>
                <Link href="/contact" className="footer-link">Contact form</Link>
              </li>
              <li>
                <Link href="/press" className="footer-link">Press & bookings</Link>
              </li>
            </ul>
          </div>

          {/* Follow */}
          <div>
            <h4 className="footer-heading">Follow</h4>
            <div className="mt-2 flex gap-4">
              <FooterIcon href="https://instagram.com" label="Instagram">
                {/* Instagram SVG */}
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                  <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm10 2H7a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3zm-5 3a5 5 0 110 10 5 5 0 010-10zm0 2.2a2.8 2.8 0 100 5.6 2.8 2.8 0 000-5.6zM18 6.5a1 1 0 110 2 1 1 0 010-2z"/>
                </svg>
              </FooterIcon>
              <FooterIcon href="https://tiktok.com" label="TikTok">
                {/* TikTok SVG */}
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                  <path d="M13.5 3h2.2c.3 1.8 1.5 3.1 3.3 3.3v2.2c-1.3 0-2.5-.4-3.3-1v7.2a5.7 5.7 0 11-5.7-5.6c.4 0 .8 0 1.2.1v2.3a3.4 3.4 0 00-1.2-.2 3.4 3.4 0 103.4 3.4V3z"/>
                </svg>
              </FooterIcon>
              <FooterIcon href="https://youtube.com" label="YouTube">
                {/* YouTube SVG */}
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                  <path d="M23.5 7.5s-.2-1.6-.8-2.3c-.7-.8-1.5-.8-1.9-.9C17.5 4 12 4 12 4h0s-5.5 0-8.8.3c-.4 0-1.2.1-1.9.9C.7 5.9.5 7.5.5 7.5S0 9.3 0 11v2c0 1.7.5 3.5.5 3.5s.2 1.6.8 2.3c.7.8 1.6.8 2 1 1.4.1 8.7.3 8.7.3s5.5 0 8.8-.3c.4 0 1.2-.1 1.9-.9.6-.7.8-2.3.8-2.3S24 14.7 24 13v-2c0-1.7-.5-3.5-.5-3.5zM9.6 9.8l6 3.2-6 3.2V9.8z"/>
                </svg>
              </FooterIcon>
            </div>
          </div>
        </div>

        {/* bottom row */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/60 md:flex-row">
          <p>© {new Date().getFullYear()} COMEDY BAR. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="footer-link text-xs">Privacy</Link>
            <Link href="/terms" className="footer-link text-xs">Terms</Link>
            <Link href="/cookies" className="footer-link text-xs">Cookies</Link>
          </div>
        </div>
      </div>

      {/* subtle red bar at very bottom */}
      <div className="h-1 w-full bg-linear-to-r from-transparent via-[#ff003c] to-transparent opacity-60" />
      
      {/* styles */}
      <style jsx global>{`
        .footer-heading {
          font-weight: 800;
          letter-spacing: .02em;
          margin-bottom: .75rem;
          color: #ff003c;
          text-shadow: 0 0 10px rgba(255,0,60,.45);
        }
        .footer-link {
          color: rgba(255,255,255,.85);
        }
        .footer-link:hover {
          color: #ff003c;
          text-shadow: 0 0 8px rgba(255,0,60,.7);
        }
      `}</style>
    </footer>
  );
}

function FooterIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      target="_blank"
      className="grid h-9 w-9 place-items-center rounded-md bg-white/5 text-white/80 shadow-[0_0_0_rgba(255,0,60,0)]
                 transition hover:text-white hover:shadow-[0_0_16px_rgba(255,0,60,0.5)] hover:bg-white/10"
    >
      {children}
    </Link>
  );
}
