"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

// ─────────────────────────────────────────
// HERO CONTENT
// ─────────────────────────────────────────

export async function updateHeroContent(formData: FormData) {
  const supabase = await createClient();

  const headline_line1 = (formData.get("headline_line1") as string)?.trim();
  const headline_line2 = (formData.get("headline_line2") as string)?.trim();
  const bio = (formData.get("bio") as string)?.trim();
  const whatsapp_number = (formData.get("whatsapp_number") as string)?.trim();
  const photo = formData.get("photo") as File;

  // Guard: don't persist if required fields are empty
  if (!headline_line1 || !headline_line2 || !bio || !whatsapp_number) {
    console.error("updateHeroContent: Missing required fields", { headline_line1, headline_line2, bio, whatsapp_number });
    return;
  }

  let photo_url: string | undefined;

  if (photo && photo.size > 0) {
    const fileName = `hero-${Date.now()}-${photo.name.replace(/\s/g, "_")}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("hero-assets")
      .upload(fileName, photo, { upsert: true });

    if (uploadError) {
      console.error("updateHeroContent: photo upload error", uploadError);
    } else if (uploadData) {
      const { data: publicData } = supabase.storage
        .from("hero-assets")
        .getPublicUrl(uploadData.path);
      photo_url = publicData.publicUrl;
      console.log("updateHeroContent: photo uploaded →", photo_url);
    }
  }

  const update = {
    id: "00000000-0000-0000-0000-000000000001",
    headline_line1,
    headline_line2,
    bio,
    whatsapp_number,
    ...(photo_url && { photo_url }),
  };

  console.log("updateHeroContent: forcefully upserting →", update);

  const { error: upsertErr } = await supabase
    .from("hero_content")
    .upsert([update], { onConflict: "id" });

  if (upsertErr) {
    console.error("updateHeroContent: upsert error", upsertErr);
  } else {
    console.log("updateHeroContent: forceful upsert success ✓");
  }

  revalidatePath("/");
  revalidatePath("/studio");
}



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
