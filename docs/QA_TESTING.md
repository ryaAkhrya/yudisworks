# QA & Testing Scenarios

1. **Anti-Slop Check:** Inspect all borders. Are there any rounded corners? (Fail if yes).
2. **Performance Check:** Run Chrome DevTools Performance. Do animations drop below 60fps? (Fail if yes).
3. **Language Check:** Are headers/CTAs in edgy English, but service descriptions/testimonials in casual Indonesian? (Fail if not mixed correctly).
4. **Responsiveness:** Does the asymmetrical layout break into an unreadable mess on mobile?
5. **CMS Auth Check:** Is the `/studio` route successfully blocked for users without authentication?