"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export const signUp = async (values: {
  username: string;
  email: string;
  password: string;
}): Promise<{ success: boolean; error: boolean }> => {
  // supabase client
  const supabase = await createClient();
  const { username, email, password } = values;

  // auth user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) {
    return { success: false, error: true };
  } else if (authData) {
    // crud ...
    const userData = {
      col: "username",
      uid: authData.user?.id,
      username: username,
      email: email,
      avatar_url: "",
      created_at: authData.user?.created_at,
    };
  }

  return { success: true, error: false };
};
