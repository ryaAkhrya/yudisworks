import { createClient } from "@/utils/supabase/server";
import Hero from "@/components/Hero";

const DEFAULTS = {
  headline_line1: "I'LL STEAL",
  headline_line2: "YOUR DEADLINES",
  bio: "Gua ngerjain apa yang lu males kerjain. Dari tugas kuliah, makalah, PPT estetik, sampai bikin website dari nol. Lu duduk manis, kerjaan beres.",
  photo_url: null as string | null,
  whatsapp_number: "1234567890",
};

export default async function HeroWrapper() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("hero_content")
    .select("*")
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("Hero content fetch error:", error);
  }

  const content = data ?? DEFAULTS;

  return (
    <Hero
      headlineLine1={content.headline_line1}
      headlineLine2={content.headline_line2}
      bio={content.bio}
      photoUrl={content.photo_url ?? null}
      whatsappNumber={content.whatsapp_number}
    />
  );
}
