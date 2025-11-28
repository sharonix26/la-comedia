// app/components/MapSection.tsx

export default function MapSection() {
  return (
    <section className="w-full bg-black/80 backdrop-blur-sm py-16 relative z-10">
      <div className="mx-auto max-w-5xl px-6 grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-start">
        {/* Left: text / address */}
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold">
            Cómo llegar
          </h2>
          <p className="mt-3 text-white/70">
            La Comedia stand up bar está en Algirós, a dos pasos de las
            universidades y del Avenidas de Blasco Ibáñez.
          </p>

          <div className="mt-5 space-y-2 text-sm md:text-base">
            <p className="font-medium">Dirección</p>
            <p className="text-white/80">
              La Comedia stand up bar
              <br />
              C de Campoamor, 59
              <br />
              Algirós, 46022 València, Valencia
            </p>
          </div>

          <a
            href="https://www.google.com/maps?q=La+Comedia+stand+up+bar,+C+de+Campoamor,+59,+Algir%C3%B3s,+46022+Val%C3%A8ncia,+Valencia"
            target="_blank"
            rel="noreferrer"
            className="inline-flex mt-6 items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-medium hover:border-white hover:bg-white/5 transition"
          >
            Abrir en Google Maps
          </a>
        </div>

        {/* Right: embedded map */}
        <div className="h-72 md:h-80 w-full overflow-hidden rounded-xl border border-white/10 shadow-lg">
          <iframe
            title="La Comedia stand up bar - mapa"
            src="https://www.google.com/maps?q=La+Comedia+stand+up+bar,+C+de+Campoamor,+59,+Algir%C3%B3s,+46022+Val%C3%A8ncia,+Valencia&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full border-0"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
