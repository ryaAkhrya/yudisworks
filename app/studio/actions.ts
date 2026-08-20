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
    // Unique filename guarantees we only INSERT, avoiding the Storage UPDATE RLS bug
    const fileName = `hero-${Date.now()}-${photo.name.replace(/\s/g, "_")}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("hero-assets")
      .upload(fileName, photo); // Removed { upsert: true }

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

  // Fetch the existing row so we can preserve the current photo_url if no new photo was uploaded.
  // This is required because `upsert` replaces the ENTIRE row and would otherwise overwrite photo_url with NULL.
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
  const file_url = (formData.get("file_url") as string)?.trim() || null;

  const { error } = await supabase.from("project_items").insert([
    { category_id, title, status, is_redacted, file_url },
  ]);

  if (error) {
    console.error("addProjectItem error:", error);
    return { error: error.message };
  }

  revalidatePath("/studio");
  revalidatePath("/");
  return { success: true };
}

export async function deleteProjectItem(id: string) {
  const supabase = await createClient();
  await supabase.from("project_items").delete().eq("id", id);
  revalidatePath("/studio");
  revalidatePath("/");
}

// ─────────────────────────────────────────
// CONFIDANT FEED
// ─────────────────────────────────────────

export async function addConfidantPost(formData: FormData) {
  const supabase = await createClient();
  const caption = (formData.get("caption") as string)?.trim() ?? "";
  const image = formData.get("image") as File;

  if (!image || image.size === 0) {
    console.error("addConfidantPost: No image provided");
    return;
  }

  // Unique filename → pure INSERT only (no upsert), bypasses RLS UPDATE restriction
  const fileName = `feed-${Date.now()}-${image.name.replace(/\s/g, "_")}`;
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("feed-assets")
    .upload(fileName, image);

  if (uploadError || !uploadData) {
    console.error("addConfidantPost: image upload error", uploadError);
    return;
  }

  const { data: publicData } = supabase.storage
    .from("feed-assets")
    .getPublicUrl(uploadData.path);

  const image_url = publicData.publicUrl;

  const { error } = await supabase
    .from("confidant_feed")
    .insert([{ image_url, caption }]);

  if (error) console.error("addConfidantPost: insert error", error);

  revalidatePath("/studio");
  revalidatePath("/");
}

export async function deleteConfidantPost(id: string) {
  const supabase = await createClient();
  await supabase.from("confidant_feed").delete().eq("id", id);
  revalidatePath("/studio");
  revalidatePath("/");
}

