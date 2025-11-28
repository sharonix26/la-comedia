**Purpose**: Short guide for AI coding agents to become productive in this repository.

**Big Picture**:
- **Framework**: Next.js (app router, Next 16) with TypeScript. Entry points live in the `app/` directory (e.g. `app/layout.tsx`, `app/page.tsx`).
- **UI structure**: App-level pages/components live in `app/components/` while reusable primitives live in `components/ui/`.
- **Map subsystem**: Mapbox is a first-class integration. Key files: `app/lib/mapbox/provider.tsx` (client-only Map provider), `app/lib/mapbox/utils.tsx` (types & icon map), `app/context/map-context.ts` (provides `useMap()` hook), and map components under `app/components/map/*` (`map-search.tsx`, `map-controls.tsx`, `map-marker.tsx`, `map-popup.tsx`, `map-styles.tsx`).

**Why these choices matter**:
- The code uses a mixture of server and client components. Map functionality and DOM-driven interactions are client-only (`"use client"`). Avoid moving map code to server components.
- `MapProvider` constructs the Mapbox `map` instance and injects it into `MapContext`. Consumers should call the `useMap()` hook from `app/context/map-context.ts` to access the `map` safely.

**Key integration points**:
- Mapbox tokens live in environment variables. The repo references `NEXT_PUBLIC_MAPBOX_TOKEN` and `NEXT_PUBLIC_MAPBOX_SESSION_TOKEN` (see `.env.local`) and some files also reference `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` — treat these as equivalent and prefer `NEXT_PUBLIC_MAPBOX_TOKEN` (used by `app/lib/mapbox/provider.tsx`).
- `map-search.tsx` calls Mapbox Search APIs directly (client fetch). Keep rate limits and tokens in mind when modifying search behavior.

**Developer workflows / commands**:
- Start dev server: `npm run dev` (runs `next dev`).
- Build for production: `npm run build` then `npm run start`.
- Lint: `npm run lint` (repo uses `eslint` with `eslint-config-next`).
- No test scripts detected; add tests under `__tests__` if required.

**Patterns & conventions to follow**:
- Component location: prefer `app/components/*` for page-specific components; use `components/ui/*` for small, reusable UI primitives (buttons, inputs, badges). Example: `components/ui/button.tsx` contains a design-system primitive used across pages.
- Client directives: files that interact with `window`, DOM, or Mapbox MUST include `"use client"` at the top. Example: `app/page.tsx` is client (`"use client"`) because it manages a `mapContainerRef` and renders `MapProvider`.
- Context usage: `MapProvider` wraps the map DOM node and sets `MapContext.Provider value={{ map }}`; consumers must call `useMap()` (throws if used outside provider). See `app/context/map-context.ts`.
- Types: The codebase is TypeScript-first. Keep explicit types for Mapbox types (`mapboxgl.Map`, `LocationFeature` in `app/lib/mapbox/utils.tsx`).

**Files to inspect when making changes** (common touchpoints):
- `app/layout.tsx` — global layout, fonts, and global CSS import (`app/globals.css`).
- `app/page.tsx` — home page wiring: `HeroCarousel`, `MapProvider`, and map children.
- `app/lib/mapbox/provider.tsx` — how the Map instance is created and lifecycle handled.
- `app/context/map-context.ts` — `useMap()` hook pattern and error handling if used incorrectly.
- `app/lib/mapbox/utils.tsx` — canonical types for map features and the `iconMap` used by marker/popups.
- `app/components/map/*` — map UI patterns (search, controls, markers, popups, styles).

**Implementation notes for AI edits**:
- Preserve `"use client"` on client components. Converting to server components will break browser-only APIs.
- When changing Mapbox usage, update both the provider (`accessToken` usage) and any client fetches that rely on session tokens (e.g. `map-search.tsx`).
- Be conservative with JSX/HTML structure in `app/layout.tsx` — it controls global fonts and the dark/black theme.

**Small examples**:
- MapProvider usage (from `app/page.tsx`):
  `MapProvider mapContainerRef={mapContainerRef} initialViewState={{ longitude: -122.4194, latitude: 37.7749, zoom: 10 }}>...children...</MapProvider>`
- Accessing map in child components:
  `const { map } = useMap(); // throws if not inside MapProvider` (see `app/context/map-context.ts`).

**Gotchas / things I observed**:
- Multiple token names are used across files (`NEXT_PUBLIC_MAPBOX_TOKEN` vs `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN`). When touching Mapbox code, search for all environment variable usages and consolidate if you change names.
- Map components render client-only third-party CSS: `import "mapbox-gl/dist/mapbox-gl.css"` — keep imports in client files.

If anything here is missing or unclear, tell me which part you want expanded (e.g., more examples from `app/components/map/*`, coding conventions for `components/ui`, or CI/run instructions). I'll iterate accordingly.
