# Phase 6: The Control Room (Admin CMS)

**Goal:** Build a protected `/studio` route where the user can manage the Supabase database (CRUD operations) without touching code.

**Tasks:**
1. Setup Next.js Route handlers and Middleware for Supabase Authentication (Email/Password login).
2. Build the `/studio/login` page: A simple, aggressive P5-styled login form.
3. Build the `/studio` dashboard (Protected Route): 
   - Must contain a form to "Add New Heist" (Title, Category, Result, Image Upload to Supabase Storage).
   - Must contain a form to "Add New Testimonial" (Name, Message).
   - Display a list of current items with a "Delete" button.
4. Keep the UI of the studio functional but still adhering to the Anti-Slop color palette (Red, Black, Paper).
5. Ensure Server Actions are used for handling the form submissions securely.