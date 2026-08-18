# Changelog

## [Unreleased]
- Initial documentation setup for AI agents.
- **Phase 5 Complete:** Added frontend UX Polish elements. Built the aggressive `LoadingScreen` with an instant cut on load, implemented a blocky `ScrollProgress` bar, and created `PhanSiteTestimonials` featuring a live-forum continuous vertical scroll powered by GSAP.
- **Phase 4 Complete:** Implemented GSAP ScrollTrigger animations for snappy whip/slide-ins on Hero and Services components. Added a fast `<Marquee />` infinite scroll behind Services. Hooked up aggressive hover states (jitter/vibrate via GSAP and instant CSS color inversions) to all interactive elements.
- **Phase 3 Complete:** Built the `PortfolioGrid` (The Heists) component. Created a mock server utility (`lib/data.ts`) simulating Supabase fetches. Designed cards to look like classified documents pinned irregularly, complete with redacted text effects using P5-black CSS blocks. Mounted component in `page.tsx`.
- **Phase 2 Complete:** Built the Hero and Services (The Arsenal) components with strict anti-slop guidelines (solid colors, hard shadows, asymmetrical layouts, skew transformations). Mounted components on the landing page.
- **Phase 1 Complete:** Initialized Next.js App Router, configured Tailwind CSS per DESIGN_SYSTEM (anti-slop constraints applied), added global CSS with halftone pattern, configured Supabase client, and updated Root Layout.

*(Agent must update this file after completing each phase).*