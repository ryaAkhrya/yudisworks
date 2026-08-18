# Phase 1: Setup Foundation

**Goal:** Initialize the environment and lock in the P5 design system.

**Tasks:**
1. Setup Next.js App Router with TypeScript.
2. Install Tailwind CSS, GSAP, `@gsap/react`, and `@supabase/supabase-js`.
3. Configure `tailwind.config.ts` strictly following `DESIGN_SYSTEM.md` colors and remove default rounded utilities.
4. Setup `globals.css` to include a global `.skew-p5` class and a halftone background pattern.
5. Create `lib/supabase.ts` for database connection.
6. Create the Root Layout applying the `p5-paper` background. No standard clean navbars allowed.