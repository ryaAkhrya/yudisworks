import { createClient } from "@/utils/supabase/server";
import LiveDeployments from "@/components/LiveDeployments";
import type { WebProject } from "@/lib/types";

export default async function LiveDeploymentsWrapper() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("web_projects")
    .select("*")
    .eq("is_visible", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Web projects fetch error:", {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });
  }

  const projects = error ? ([] as WebProject[]) : ((data ?? []) as WebProject[]);

  return <LiveDeployments projects={projects} />;
}
