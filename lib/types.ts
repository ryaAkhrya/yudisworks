export type SkillVisualVariant = "paper" | "dark" | "red" | "outline";
export type WebProjectStatus = "live" | "private" | "archived" | "development";

export interface Skill {
  id: string;
  created_at: string;
  title: string;
  description: string;
  tools: string[];
  proof_label: string;
  proof_href: string;
  visual_variant: SkillVisualVariant;
  sort_order: number;
  is_visible: boolean;
}

export interface WebProject {
  id: string;
  created_at: string;
  title: string;
  description: string;
  preview_image_url: string | null;
  live_url: string | null;
  display_domain: string | null;
  tech_stack: string[];
  repository_url: string | null;
  case_study_url: string | null;
  status: WebProjectStatus;
  sort_order: number;
  is_featured: boolean;
  is_visible: boolean;
}

export const SKILL_VISUAL_VARIANTS: SkillVisualVariant[] = ["paper", "dark", "red", "outline"];
export const WEB_PROJECT_STATUSES: WebProjectStatus[] = ["live", "private", "archived", "development"];
