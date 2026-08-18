"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    // Usually we would return the error to the UI, 
    // but in P5 aggressive style, maybe we just redirect with a query param
    redirect("/studio/login?error=Invalid%20Credentials");
  }

  revalidatePath("/studio", "layout");
  redirect("/studio");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  
  redirect("/studio/login");
}
