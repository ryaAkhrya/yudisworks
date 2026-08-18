# System Architecture & Tech Spec

## 1. Tech Stack
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS (Strictly custom config, NO UI libraries like Shadcn or Bootstrap)
- **Animations:** GSAP (GreenSock) for high-performance DOM manipulation.
- **Database/Backend:** Supabase (PostgreSQL, Auth, Storage).

## 2. Folder Structure
```text
/app
  /(public)     # Public facing pages
  /studio       # Protected admin CMS
  /api          # Supabase routes & Server Actions
  /components   # Reusable UI (Hero, Arsenal, Heists)
  /styles       # globals.css
/lib
  supabase.ts   # Client config
  gsap.ts       # GSAP plugin registry
/public
  /assets       # Fonts, images, halftone SVGs

## 3. Data Flow
Frontend fetches data from Supabase via Next.js Server Components (@supabase/ssr).

Admin Studio handles CRUD mutations securely using Next.js Server Actions.