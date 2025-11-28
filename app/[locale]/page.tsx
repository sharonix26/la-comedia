import HeroCarousel from "../components/HeroCarousel";
import UpcomingEventsSection from "../components/UpcomingEventsSection";
import MapSection from "../components/mapsection";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-transparent text-white relative z-10">
      {/* Hero Section */}
      <HeroCarousel />

      {/* Upcoming Events Section (scroll target for CTA) */}
      <UpcomingEventsSection />

      {/* Map + address section */}
      <MapSection />
    </main>
  );
}
