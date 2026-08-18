import { createClient } from "@supabase/supabase-js";

// Mocking environment variables for the setup phase since we don't have them yet.
// In a real scenario, these would come from process.env.NEXT_PUBLIC_SUPABASE_URL and ANON_KEY.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-project.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
