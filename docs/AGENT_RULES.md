# SOP & Directives for AI Agent (Antigravity)

1. **Absolute Obedience to Design System:** Any output containing standard Tailwind UI components, Shadcn, or generic clean aesthetics will be immediately rejected.
2. **TypeScript Strict Mode:** All code must be typed. Avoid `any`.
3. **Performance First:** GSAP must manipulate `transform` and `opacity` only. Never animate `width`, `height`, or `top/left` which causes layout thrashing.
4. **No Placeholder Code:** Write complete, functional code blocks. When mocking Supabase data, write the actual mock objects matching `PORTFOLIO_DATA.md` exactly.
5. **Linting:** Ensure code passes `next lint` and `tsc --noEmit` before concluding a task.