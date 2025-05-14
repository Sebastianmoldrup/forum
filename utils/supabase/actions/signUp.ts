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

  // handle auth error
  if (authError) {
    console.log("Auth error:", authError);
    // user exists
    if (authError.code === "user_already_exists") {
      return { validated: false, error: "Brukeren eksisterer allerede!" };
      // weak password
    } else if (authError.code === "weak_password") {
      return { validated: false, error: "Passordet er for svakt!" };
      // invalid email
    } else if (authError.code === "invalid_email") {
      return { validated: false, error: "E-posten er ugyldig!" };
      // default/unknown error
    } else {
      return { validated: false, error: "Noe gikk gale!" };
    }
  }

  // handle auth success
  if (authData) {
    // add user to table
    const { error: userError } = await supabase.from("users").insert({
      uid: authData.user?.id,
      username: username,
      email: email,
      avatar_url: "",
      created_at: authData.user?.created_at,
    });

    // handle user error
    if (userError) {
      console.log("User error:", userError);
      return { validated: false, error: "Noe gikk gale!" };
    }

    // handle user success
    revalidatePath("/");
    return { validated: true, error: null };
  }

  // handle any unforeseen errors
  console.log("Unforeseen error:", authError);
  return { validated: false, error: "Noe gikk gale!" };
};
