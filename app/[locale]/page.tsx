import AboutSection from "../components/AboutSection";
import HeroCarousel from "../components/HeroCarousel";
import UpcomingEventsSection from "../components/UpcomingEventsSection";
import MapSection from "../components/mapsection";

export default function HomePage() {
  return (
    <main className="relative z-10 min-h-screen bg-transparent text-white">
      <div className="space-y-16 sm:space-y-20 pb-16">
        {/* Hero Section */}
        <HeroCarousel />

        {/* About us */}
        <AboutSection />

        {/* Upcoming Events Section (scroll target for CTA) */}
        <UpcomingEventsSection />

        {/* Map + address section */}
        <MapSection />
      </div>
    </main>
  );
}
