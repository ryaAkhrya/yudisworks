import { createClient } from "@/utils/supabase/server";
import Services from "@/components/Services";
import type { Skill } from "@/lib/types";

export default async function ServicesWrapper() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("skills")
    .select("*")
    .eq("is_visible", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Skills fetch error:", {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });
  }

  const skills = error ? ([] as Skill[]) : ((data ?? []) as Skill[]);

  return <Services skills={skills} />;
}
