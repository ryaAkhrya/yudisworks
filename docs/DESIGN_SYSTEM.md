### 4. `docs/DESIGN_SYSTEM.md`
```markdown
# Visual Guidelines & Anti-Slop Rules

**WARNING: STRICT COMPLIANCE REQUIRED. DO NOT USE STANDARD MODERN UI TRENDS.**

## 1. Color Palette
- `p5-red`: `#CE0000` (Main accent)
- `p5-black`: `#121212` (Backgrounds, thick borders, hard shadows)
- `p5-paper`: `#F5F5F5` (Off-white for backgrounds/text)

## 2. Typography
- **Heading (UI/English):** Punk/Ransom note/Stencil font. Must look aggressive.
- **Body (Content/Indonesian):** Thick, readable sans-serif, often bold/italic.

## 3. Anti-Slop Constraints (CRITICAL)
- **NO Soft Corners:** Use `rounded-none`, sharp edges, or jagged clip-paths ONLY.
- **NO Bento Grids:** Layouts must be chaotic, overlapping, and asymmetrical.
- **NO Lucide/Hero Icons:** Use custom jagged SVGs or pure typography.
- **NO Gradients/Glassmorphism:** Solid colors ONLY.
- **NO Drop Shadows:** Use hard block shadows (e.g., `box-shadow: 8px 8px 0px #121212`).

## 4. Motion Rules
- `transform: skew(-5deg)` is the baseline for containers and cards.
- Animations must be fast, snappy, and aggressive (whip-like), powered by GSAP.