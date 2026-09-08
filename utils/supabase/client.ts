import { createBrowserClient } from "@supabase/ssr";

import { getSupabaseConfig } from "@/utils/supabase/config";

export function createClient() {
  const { url, anonKey } = getSupabaseConfig();
  return createBrowserClient(url, anonKey);
}
