import { createClient } from "@/utils/supabase/server";
import ConfidantFeed from "@/components/ConfidantFeed";

export default async function ConfidantFeedWrapper() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("confidant_feed")
    .select("id, created_at, image_url, caption")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("ConfidantFeedWrapper: fetch error", error);
  }

  const posts = data ?? [];

  return <ConfidantFeed posts={posts} />;
}
