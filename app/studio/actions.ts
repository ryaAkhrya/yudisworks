"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

export async function addHeist(formData: FormData) {
  const supabase = await createClient();

  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  const result = formData.get("result") as string;
  const image = formData.get("image") as File;
  
  // Real implementation: Upload image to Supabase Storage
  let imageUrl = "";
  if (image && image.size > 0) {
    const fileName = `${Date.now()}-${image.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("heists")
      .upload(fileName, image);
      
    if (!uploadError && uploadData) {
      imageUrl = uploadData.path;
    }
  }

  // Insert into DB
  const { error } = await supabase
    .from("heists")
    .insert([{ title, category, status: result, image_url: imageUrl }]);

  if (error) {
    console.error("Error adding heist:", error);
    // Handle error...
  }

  revalidatePath("/studio");
  revalidatePath("/");
}

export async function deleteHeist(id: string) {
  const supabase = await createClient();
  await supabase.from("heists").delete().eq("id", id);
  revalidatePath("/studio");
  revalidatePath("/");
}

export async function addTestimonial(formData: FormData) {
  const supabase = await createClient();

  const name = formData.get("name") as string;
  const message = formData.get("message") as string;

  const { error } = await supabase
    .from("testimonials")
    .insert([{ author: name, text: message }]);

  if (error) {
    console.error("Error adding testimonial:", error);
  }

  revalidatePath("/studio");
  revalidatePath("/");
}

export async function deleteTestimonial(id: string) {
  const supabase = await createClient();
  await supabase.from("testimonials").delete().eq("id", id);
  revalidatePath("/studio");
  revalidatePath("/");
}
