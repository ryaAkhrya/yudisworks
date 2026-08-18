"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

// ─────────────────────────────────────────
// TESTIMONIALS
// ─────────────────────────────────────────

export async function addTestimonial(formData: FormData) {
  const supabase = await createClient();
  const name = formData.get("name") as string;
  const message = formData.get("message") as string;

  const { error } = await supabase
    .from("testimonials")
    .insert([{ author: name, text: message }]);

  if (error) console.error("addTestimonial error:", error);

  revalidatePath("/studio");
  revalidatePath("/");
}

export async function deleteTestimonial(id: string) {
  const supabase = await createClient();
  await supabase.from("testimonials").delete().eq("id", id);
  revalidatePath("/studio");
  revalidatePath("/");
}

// ─────────────────────────────────────────
// PROJECT CATEGORIES
// ─────────────────────────────────────────

export async function addCategory(formData: FormData) {
  const supabase = await createClient();
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const accent_color = (formData.get("accent_color") as string) || "#CE0000";

  const { error } = await supabase
    .from("project_categories")
    .insert([{ name, description, accent_color }]);

  if (error) console.error("addCategory error:", error);

  revalidatePath("/studio");
  revalidatePath("/");
}

export async function deleteCategory(id: string) {
  const supabase = await createClient();
  // Cascade deletes project_items too (FK ON DELETE CASCADE)
  await supabase.from("project_categories").delete().eq("id", id);
  revalidatePath("/studio");
  revalidatePath("/");
}

// ─────────────────────────────────────────
// PROJECT ITEMS
// ─────────────────────────────────────────

export async function addProjectItem(formData: FormData) {
  const supabase = await createClient();
  const category_id = formData.get("category_id") as string;
  const title = formData.get("title") as string;
  const status = formData.get("status") as string;
  const is_redacted = formData.get("is_redacted") === "on";

  // Handle multiple file uploads
  const files = formData.getAll("files") as File[];
  const image_urls: string[] = [];

  for (const file of files) {
    if (file && file.size > 0) {
      const fileName = `${Date.now()}-${file.name.replace(/\s/g, "_")}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("project-files")
        .upload(fileName, file);

      if (!uploadError && uploadData) {
        const { data: publicUrlData } = supabase.storage
          .from("project-files")
          .getPublicUrl(uploadData.path);
        image_urls.push(publicUrlData.publicUrl);
      }
    }
  }

  const { error } = await supabase.from("project_items").insert([
    { category_id, title, status, is_redacted, image_urls },
  ]);

  if (error) console.error("addProjectItem error:", error);

  revalidatePath("/studio");
  revalidatePath("/");
}

export async function deleteProjectItem(id: string) {
  const supabase = await createClient();
  await supabase.from("project_items").delete().eq("id", id);
  revalidatePath("/studio");
  revalidatePath("/");
}
