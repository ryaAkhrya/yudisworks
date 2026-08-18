import { createClient } from "@/utils/supabase/server";
import PhanSiteTestimonials from "@/components/PhanSiteTestimonials";

const FALLBACK = [
  {
    author: "Anon_01",
    text: "Gila, web kelar cepet banget, desainnya ga pasaran! Recommended parah.",
  },
  {
    author: "Mahasiswa_Stress",
    text: "Tugas akhir gua bug-nya dibenerin cepet banget. Life saver!",
  },
  {
    author: "Client_X",
    text: "Presentasi PPT buat pitching tembus, desainnya emang bikin melek. Thanks bang!",
  },
];

export default async function TestimonialsWrapper() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("id, author, text")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Testimonials fetch error:", error);
  }

  const testimonials = data && data.length > 0 ? data : FALLBACK;

  return <PhanSiteTestimonials testimonials={testimonials} />;
}
