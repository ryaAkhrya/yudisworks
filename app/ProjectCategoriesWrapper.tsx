import { createClient } from "@/utils/supabase/server";
import ProjectCategories from "@/components/ProjectCategories";

export default async function ProjectCategoriesWrapper() {
  const supabase = await createClient();

  const { data: categories, error } = await supabase
    .from("project_categories")
    .select("*, project_items(*)")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching categories:", error);
  }

  return <ProjectCategories categories={categories ?? []} />;
}
