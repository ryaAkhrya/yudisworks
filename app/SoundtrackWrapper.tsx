import { createClient } from "@/utils/supabase/server";
import Soundtrack from "@/components/Soundtrack";
import type { MusicTrack } from "@/lib/types";

export default async function SoundtrackWrapper() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("music_tracks")
    .select("*")
    .eq("is_visible", true)
    .order("is_featured", { ascending: false })
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Soundtrack fetch error:", {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });
  }

  const tracks = error ? ([] as MusicTrack[]) : ((data ?? []) as MusicTrack[]);

  return <Soundtrack tracks={tracks} />;
}
