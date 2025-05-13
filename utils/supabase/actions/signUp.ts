"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export const signUp = async ({
  username,
  email,
  password,
}: {
  username: string;
  email: string;
  password: string;
}): Promise<{ validated: boolean; error: string | null }> => {
  console.log("signUp called with:", { username, email, password });
  // supabase client
  const supabase = await createClient();

  // auth user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  // handle data error
  if (authError) {
    return { validated: false, error: "Noe gikk gale!" };
  }

  // add user to users table
  if (authData) {
    const { error: userError } = await supabase.from("users").insert({
      uid: authData.user?.id,
      username: username,
      email: email,
      avatar_url: "",
      created_at: authData.user?.created_at,
    });

    if (userError) {
      return { validated: false, error: "Noe gikk gale!" };
    }

    revalidatePath("/");
    return { validated: true, error: null };
  }

  // return obj with result
  return { validated: false, error: "Noe gikk gale!" };
};
