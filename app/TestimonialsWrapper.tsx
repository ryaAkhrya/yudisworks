import { createClient } from "@/utils/supabase/server";
import PhanSiteTestimonials from "@/components/PhanSiteTestimonials";

const FALLBACK = [
  {
    author: "ANONYMOUS 1",
    text: "Bagus banger kerjanya, kebut!",
    sort_order: 0,
    visible: true,
    created_at: new Date().toISOString(),
  },
  {
    author: "ANONYMOUS 2",
    text: "Melodi dan produksinya ngena banget — lagu gampang nempel di kepala. Bikin replay berkali-kali.",
    sort_order: 1,
    visible: true,
    created_at: new Date().toISOString(),
  },
];

function safeLogSupabaseError(error: { message?: string; code?: string; details?: string; hint?: string } | null) {
  if (!error) return;

  console.error("Testimonials fetch error:", {
    message: error.message,
    code: error.code,
    details: error.details,
    hint: error.hint,
  });
}

function normalizeTestimonials(rows: Array<Record<string, unknown>> = []) {
  return rows
    .map((row) => {
      const rawDisplayName = typeof row.display_name === "string" ? row.display_name : typeof row.author === "string" ? row.author : "ANONYMOUS";
      const rawMessage = typeof row.message === "string" ? row.message : typeof row.text === "string" ? row.text : "";
      const sortOrder = Number(row.sort_order ?? 0);
      const visible = row.visible === false ? false : true;

      const displayName = String(rawDisplayName ?? "ANONYMOUS").trim() || "ANONYMOUS";
      const message = String(rawMessage ?? "").trim();

      if (!message) {
        return null;
      }

      return {
        author: displayName,
        text: message,
        sort_order: Number.isFinite(sortOrder) ? sortOrder : 0,
        visible,
        created_at: String(row.created_at ?? new Date().toISOString()),
      };
    })
    .filter((row): row is NonNullable<typeof row> => Boolean(row))
    .filter((row) => row.visible)
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0) || new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
}

export default async function TestimonialsWrapper() {
  const supabase = await createClient();

  let data: Array<Record<string, unknown>> | null = null;
  let error: { message?: string; code?: string; details?: string; hint?: string } | null = null;

  try {
    const response = await supabase
      .from("testimonials")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });

    data = (response.data as Array<Record<string, unknown>> | null) ?? null;
    error = response.error as { message?: string; code?: string; details?: string; hint?: string } | null;
  } catch (caughtError) {
    error = caughtError as { message?: string; code?: string; details?: string; hint?: string };
  }

  safeLogSupabaseError(error);

  const normalized = normalizeTestimonials(data ?? []);
  const testimonials = normalized.length > 0 ? normalized : FALLBACK;

  return <PhanSiteTestimonials testimonials={testimonials} />;
}
