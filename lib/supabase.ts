import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://plbwqjpojwgfobyjguyf.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_BfcAFSZl9rm1iNT3F4BJDA_B0RKpbGy";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
