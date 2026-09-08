"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import type { SkillVisualVariant, WebProjectStatus } from "@/lib/types";

export type ActionResult = {
  success: boolean;
  error?: string;
};

const allowedSkillVariants: SkillVisualVariant[] = ["paper", "dark", "red", "outline"];
const allowedWebStatuses: WebProjectStatus[] = ["live", "private", "archived", "development"];

function parseCsvList(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 20);
}

function normalizeBoolean(value: FormDataEntryValue | null): boolean {
  if (!value) return false;
  const raw = String(value).toLowerCase();
  return raw === "on" || raw === "true" || raw === "1" || raw === "yes";
}

function normalizeSkillVariant(value: FormDataEntryValue | null): SkillVisualVariant | null {
  const variant = String(value ?? "paper").trim().toLowerCase();

  if (allowedSkillVariants.includes(variant as SkillVisualVariant)) {
    return variant as SkillVisualVariant;
  }

  return null;
}

function normalizeStatus(value: FormDataEntryValue | null): WebProjectStatus | null {
  const status = String(value ?? "live").trim().toLowerCase();

  if (allowedWebStatuses.includes(status as WebProjectStatus)) {
    return status as WebProjectStatus;
  }

  return null;
}

function normalizeOptionalUrl(value: FormDataEntryValue | null, allowEmpty = true): { value: string | null; error?: string } {
  const result = String(value ?? "").trim();

  if (!result) {
    return { value: allowEmpty ? null : "/" };
  }

  if (result.startsWith("#") || result.startsWith("/")) {
    return { value: result };
  }

  const lower = result.toLowerCase();
  if (lower.startsWith("javascript:") || lower.startsWith("data:") || lower.startsWith("vbscript:")) {
    return { value: null, error: "URL is invalid. Use a relative path, anchor, or HTTP(S) URL." };
  }

  if (/^https?:\/\//i.test(result)) {
    return { value: result };
  }

  return { value: null, error: "URL is invalid. Use a relative path, anchor, or HTTP(S) URL." };
}

function normalizeSafeHref(value: FormDataEntryValue | null, fallback: string): { value: string; error?: string } {
  const href = String(value ?? "").trim();

  if (!href) {
    return { value: fallback };
  }

  if (href.startsWith("#") || href.startsWith("/")) {
    return { value: href };
  }

  const lower = href.toLowerCase();
  if (lower.startsWith("javascript:") || lower.startsWith("data:") || lower.startsWith("vbscript:")) {
    return { value: fallback, error: "Proof link must be a section anchor, internal path, or HTTPS URL." };
  }

  if (/^https?:\/\//i.test(href)) {
    return { value: href };
  }

  return { value: fallback, error: "Proof link must be a section anchor, internal path, or HTTPS URL." };
}

function validateImageFile(file: File | null): File | null {
  if (!file || file.size === 0) return null;

  const allowedMime = ["image/jpeg", "image/png", "image/webp"];
  if (!allowedMime.includes(file.type)) {
    throw new Error(`Unsupported image type: ${file.type}`);
  }

  if (file.size > 5 * 1024 * 1024) {
    throw new Error("Image is too large. Max 5MB.");
  }

  return file;
}

async function requireStudioUser() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/studio/login");
  }

  return supabase;
}

async function uploadPublicFile(
  supabase: Awaited<ReturnType<typeof createClient>>,
  bucket: string,
  file: File,
  folderPrefix: string
) {
  const safeName = file.name.replace(/\s+/g, "_");
  const fileName = `${folderPrefix}-${Date.now()}-${safeName}`;

  const { data: uploadData, error: uploadError } = await supabase.storage.from(bucket).upload(fileName, file);

  if (uploadError || !uploadData) {
    throw new Error(uploadError?.message ?? `Upload failed for ${bucket}`);
  }

  const { data: publicData } = supabase.storage.from(bucket).getPublicUrl(uploadData.path);
  return publicData.publicUrl;
}

function buildResultSuccess(): ActionResult {
  return { success: true };
}

function buildResultError(error: string): ActionResult {
  return { success: false, error };
}

export async function updateHeroContent(formData: FormData) {
  const supabase = await requireStudioUser();

  const headline_line1 = (formData.get("headline_line1") as string)?.trim();
  const headline_line2 = (formData.get("headline_line2") as string)?.trim();
  const bio = (formData.get("bio") as string)?.trim();
  const whatsapp_number = (formData.get("whatsapp_number") as string)?.trim();
  const photo = formData.get("photo") as File | null;

  if (!headline_line1 || !headline_line2 || !bio || !whatsapp_number) {
    console.error("updateHeroContent: Missing required fields", { headline_line1, headline_line2, bio, whatsapp_number });
    return;
  }

  let photo_url: string | undefined;

  if (photo && photo.size > 0) {
    try {
      const validatedPhoto = validateImageFile(photo);
      if (validatedPhoto) {
        photo_url = await uploadPublicFile(supabase, "hero-assets", validatedPhoto, "hero");
      }
    } catch (error) {
      console.error("updateHeroContent: invalid photo", error);
      return;
    }
  }

  const { data: existing } = await supabase
    .from("hero_content")
    .select("photo_url")
    .eq("id", "00000000-0000-0000-0000-000000000001")
    .maybeSingle();

  const final_photo_url = photo_url || existing?.photo_url || null;

  const update = {
    id: "00000000-0000-0000-0000-000000000001",
    headline_line1,
    headline_line2,
    bio,
    whatsapp_number,
    photo_url: final_photo_url,
  };

  const { error: upsertErr } = await supabase.from("hero_content").upsert([update], { onConflict: "id" });

  if (upsertErr) {
    console.error("updateHeroContent: upsert error", upsertErr);
    return;
  }

  revalidatePath("/");
  revalidatePath("/studio");
}

export async function addTestimonial(formData: FormData) {
  const supabase = await requireStudioUser();
  const name = String(formData.get("name") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !message) {
    return;
  }

  const { error } = await supabase.from("testimonials").insert([{ author: name, text: message }]);

  if (error) {
    console.error("addTestimonial error:", error);
    return;
  }

  revalidatePath("/studio");
  revalidatePath("/");
}

export async function deleteTestimonial(id: string) {
  const supabase = await requireStudioUser();
  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) {
    console.error("deleteTestimonial error:", error);
    return;
  }

  revalidatePath("/studio");
  revalidatePath("/");
}

export async function addCategory(formData: FormData) {
  const supabase = await requireStudioUser();
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const accent_color = (formData.get("accent_color") as string) || "#CE0000";

  if (!name) {
    return;
  }

  const { error } = await supabase.from("project_categories").insert([{ name, description, accent_color }]);

  if (error) {
    console.error("addCategory error:", error);
    return;
  }

  revalidatePath("/studio");
  revalidatePath("/");
}

export async function deleteCategory(id: string) {
  const supabase = await requireStudioUser();
  const { error } = await supabase.from("project_categories").delete().eq("id", id);
  if (error) {
    console.error("deleteCategory error:", error);
    return;
  }

  revalidatePath("/studio");
  revalidatePath("/");
}

export async function addProjectItem(formData: FormData) {
  const supabase = await requireStudioUser();
  const category_id = String(formData.get("category_id") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const status = String(formData.get("status") ?? "CLASSIFIED").trim();
  const is_redacted = formData.get("is_redacted") === "on";
  const file_url = (formData.get("file_url") as string)?.trim() || null;

  if (!category_id || !title || !status) {
    return;
  }

  const { error } = await supabase.from("project_items").insert([
    { category_id, title, status, is_redacted, file_url },
  ]);

  if (error) {
    console.error("addProjectItem error:", error);
    return;
  }

  revalidatePath("/studio");
  revalidatePath("/");
}

export async function deleteProjectItem(id: string) {
  const supabase = await requireStudioUser();
  const { error } = await supabase.from("project_items").delete().eq("id", id);
  if (error) {
    console.error("deleteProjectItem error:", error);
    return;
  }

  revalidatePath("/studio");
  revalidatePath("/");
}

export async function addConfidantPost(formData: FormData) {
  const supabase = await requireStudioUser();
  const caption = (formData.get("caption") as string)?.trim() ?? "";
  const image = formData.get("image") as File | null;

  if (!image || image.size === 0) {
    return;
  }

  try {
    const validatedImage = validateImageFile(image);
    if (!validatedImage) {
      return;
    }

    const image_url = await uploadPublicFile(supabase, "feed-assets", validatedImage, "feed");

    const { error } = await supabase.from("confidant_feed").insert([{ image_url, caption }]);

    if (error) {
      console.error("addConfidantPost: insert error", error);
      return;
    }

    revalidatePath("/studio");
    revalidatePath("/");
  } catch (error) {
    console.error("addConfidantPost: invalid image", error);
  }
}

export async function deleteConfidantPost(id: string) {
  const supabase = await requireStudioUser();
  const { error } = await supabase.from("confidant_feed").delete().eq("id", id);
  if (error) {
    console.error("deleteConfidantPost error:", error);
    return;
  }

  revalidatePath("/studio");
  revalidatePath("/");
}

export async function addSkill(formData: FormData): Promise<ActionResult> {
  try {
    const supabase = await requireStudioUser();

    const title = String(formData.get("title") ?? "").trim();
    const description = String(formData.get("description") ?? "").trim();
    const tools = parseCsvList(formData.get("tools"));
    const proof_label = String(formData.get("proof_label") ?? "VIEW WORK").trim() || "VIEW WORK";
    const hrefValidation = normalizeSafeHref(formData.get("proof_href"), "#operations");
    const visual_variant = normalizeSkillVariant(formData.get("visual_variant"));
    const sort_order = Number(formData.get("sort_order") ?? 0);
    const is_visible = normalizeBoolean(formData.get("is_visible"));

    if (!title || !description) {
      return buildResultError("Title and description are required.");
    }

    if (title.length > 120) {
      return buildResultError("Skill title must stay under 120 characters.");
    }

    if (description.length > 500) {
      return buildResultError("Description must stay under 500 characters.");
    }

    if (tools.length === 0) {
      return buildResultError("Add at least one tool or stack item.");
    }

    if (!visual_variant) {
      return buildResultError("Select a valid skill visual variant.");
    }

    if (hrefValidation.error) {
      return buildResultError(hrefValidation.error);
    }

    const { error } = await supabase.from("skills").insert([
      {
        title,
        description,
        tools,
        proof_label,
        proof_href: hrefValidation.value,
        visual_variant,
        sort_order,
        is_visible,
      },
    ]);

    if (error) {
      console.error("addSkill error:", error);
      return buildResultError("Unable to save the skill right now. Please try again.");
    }

    revalidatePath("/");
    revalidatePath("/studio");
    return buildResultSuccess();
  } catch (error) {
    console.error("addSkill failed unexpectedly:", error);
    return buildResultError("Unable to save the skill right now. Please try again.");
  }
}

export async function updateSkill(id: string, formData: FormData): Promise<ActionResult> {
  try {
    const supabase = await requireStudioUser();

    const title = String(formData.get("title") ?? "").trim();
    const description = String(formData.get("description") ?? "").trim();
    const tools = parseCsvList(formData.get("tools"));
    const proof_label = String(formData.get("proof_label") ?? "VIEW WORK").trim() || "VIEW WORK";
    const hrefValidation = normalizeSafeHref(formData.get("proof_href"), "#operations");
    const visual_variant = normalizeSkillVariant(formData.get("visual_variant"));
    const sort_order = Number(formData.get("sort_order") ?? 0);
    const is_visible = normalizeBoolean(formData.get("is_visible"));

    if (!title || !description) {
      return buildResultError("Title and description are required.");
    }

    if (tools.length === 0) {
      return buildResultError("Add at least one tool or stack item.");
    }

    if (!visual_variant) {
      return buildResultError("Select a valid skill visual variant.");
    }

    if (hrefValidation.error) {
      return buildResultError(hrefValidation.error);
    }

    const { error } = await supabase
      .from("skills")
      .update({
        title,
        description,
        tools,
        proof_label,
        proof_href: hrefValidation.value,
        visual_variant,
        sort_order,
        is_visible,
      })
      .eq("id", id);

    if (error) {
      console.error("updateSkill error:", error);
      return buildResultError("Unable to update the skill right now. Please try again.");
    }

    revalidatePath("/");
    revalidatePath("/studio");
    return buildResultSuccess();
  } catch (error) {
    console.error("updateSkill failed unexpectedly:", error);
    return buildResultError("Unable to update the skill right now. Please try again.");
  }
}

export async function deleteSkill(id: string): Promise<void> {
  try {
    const supabase = await requireStudioUser();
    const { error } = await supabase.from("skills").delete().eq("id", id);

    if (error) {
      console.error("deleteSkill error:", error);
      return;
    }

    revalidatePath("/");
    revalidatePath("/studio");
  } catch (error) {
    console.error("deleteSkill failed unexpectedly:", error);
  }
}

export async function addWebProject(formData: FormData): Promise<ActionResult> {
  try {
    const supabase = await requireStudioUser();

    const title = String(formData.get("title") ?? "").trim();
    const description = String(formData.get("description") ?? "").trim();
    const live_url_result = normalizeOptionalUrl(formData.get("live_url"), true);
    const display_domain = String(formData.get("display_domain") ?? "").trim();
    const repository_url_result = normalizeOptionalUrl(formData.get("repository_url"), true);
    const case_study_url_result = normalizeOptionalUrl(formData.get("case_study_url"), true);
    const tech_stack = parseCsvList(formData.get("tech_stack"));
    const status = normalizeStatus(formData.get("status"));
    const sort_order = Number(formData.get("sort_order") ?? 0);
    const is_featured = normalizeBoolean(formData.get("is_featured"));
    const is_visible = normalizeBoolean(formData.get("is_visible"));

    if (!title || !description) {
      return buildResultError("Title and description are required.");
    }

    if (tech_stack.length === 0) {
      return buildResultError("Add at least one technology or stack item.");
    }

    if (!status) {
      return buildResultError("Select a valid project status.");
    }

    if (live_url_result.error) {
      return buildResultError(live_url_result.error);
    }

    if (repository_url_result.error) {
      return buildResultError(repository_url_result.error);
    }

    if (case_study_url_result.error) {
      return buildResultError(case_study_url_result.error);
    }

    let preview_image_url: string | null = null;
    const image = formData.get("image") as File | null;
    if (image && image.size > 0) {
      try {
        const validatedImage = validateImageFile(image);
        if (validatedImage) {
          preview_image_url = await uploadPublicFile(supabase, "web-project-assets", validatedImage, "deploy");
        }
      } catch (error) {
        console.error("addWebProject: invalid image", error);
        return buildResultError("Preview image must be a JPG, PNG, or WEBP file under 5MB.");
      }
    }

    const live_url = live_url_result.value;
    const repository_url = repository_url_result.value;
    const case_study_url = case_study_url_result.value;
    const nextDisplayDomain = display_domain || (live_url && /^https?:\/\//i.test(live_url) ? new URL(live_url).hostname : null);

    const { error } = await supabase.from("web_projects").insert([
      {
        title,
        description,
        preview_image_url,
        live_url,
        display_domain: nextDisplayDomain,
        tech_stack,
        repository_url,
        case_study_url,
        status,
        sort_order,
        is_featured,
        is_visible,
      },
    ]);

    if (error) {
      console.error("addWebProject error:", error);
      return buildResultError("Unable to save the deployment right now. Please try again.");
    }

    revalidatePath("/");
    revalidatePath("/studio");
    return buildResultSuccess();
  } catch (error) {
    console.error("addWebProject failed unexpectedly:", error);
    return buildResultError("Unable to save the deployment right now. Please try again.");
  }
}

export async function updateWebProject(id: string, formData: FormData): Promise<ActionResult> {
  try {
    const supabase = await requireStudioUser();

    const title = String(formData.get("title") ?? "").trim();
    const description = String(formData.get("description") ?? "").trim();
    const live_url_result = normalizeOptionalUrl(formData.get("live_url"), true);
    const display_domain = String(formData.get("display_domain") ?? "").trim();
    const repository_url_result = normalizeOptionalUrl(formData.get("repository_url"), true);
    const case_study_url_result = normalizeOptionalUrl(formData.get("case_study_url"), true);
    const tech_stack = parseCsvList(formData.get("tech_stack"));
    const status = normalizeStatus(formData.get("status"));
    const sort_order = Number(formData.get("sort_order") ?? 0);
    const is_featured = normalizeBoolean(formData.get("is_featured"));
    const is_visible = normalizeBoolean(formData.get("is_visible"));

    if (!title || !description) {
      return buildResultError("Title and description are required.");
    }

    if (tech_stack.length === 0) {
      return buildResultError("Add at least one technology or stack item.");
    }

    if (!status) {
      return buildResultError("Select a valid project status.");
    }

    if (live_url_result.error) {
      return buildResultError(live_url_result.error);
    }

    if (repository_url_result.error) {
      return buildResultError(repository_url_result.error);
    }

    if (case_study_url_result.error) {
      return buildResultError(case_study_url_result.error);
    }

    const { data: existing } = await supabase.from("web_projects").select("preview_image_url").eq("id", id).maybeSingle();

    let preview_image_url = existing?.preview_image_url ?? null;
    const image = formData.get("image") as File | null;
    if (image && image.size > 0) {
      try {
        const validatedImage = validateImageFile(image);
        if (validatedImage) {
          preview_image_url = await uploadPublicFile(supabase, "web-project-assets", validatedImage, "deploy");
        }
      } catch (error) {
        console.error("updateWebProject: invalid image", error);
        return buildResultError("Preview image must be a JPG, PNG, or WEBP file under 5MB.");
      }
    }

    const live_url = live_url_result.value;
    const repository_url = repository_url_result.value;
    const case_study_url = case_study_url_result.value;
    const nextDisplayDomain = display_domain || (live_url && /^https?:\/\//i.test(live_url) ? new URL(live_url).hostname : null);

    const { error } = await supabase
      .from("web_projects")
      .update({
        title,
        description,
        preview_image_url,
        live_url,
        display_domain: nextDisplayDomain,
        tech_stack,
        repository_url,
        case_study_url,
        status,
        sort_order,
        is_featured,
        is_visible,
      })
      .eq("id", id);

    if (error) {
      console.error("updateWebProject error:", error);
      return buildResultError("Unable to update the deployment right now. Please try again.");
    }

    revalidatePath("/");
    revalidatePath("/studio");
    return buildResultSuccess();
  } catch (error) {
    console.error("updateWebProject failed unexpectedly:", error);
    return buildResultError("Unable to update the deployment right now. Please try again.");
  }
}

export async function deleteWebProject(id: string): Promise<void> {
  try {
    const supabase = await requireStudioUser();
    const { error } = await supabase.from("web_projects").delete().eq("id", id);

    if (error) {
      console.error("deleteWebProject error:", error);
      return;
    }

    revalidatePath("/");
    revalidatePath("/studio");
  } catch (error) {
    console.error("deleteWebProject failed unexpectedly:", error);
  }
}

