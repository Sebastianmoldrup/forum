import { createClient } from "@/utils/supabase/server";

// Create, Read, Update, Delete (CRUD) operations for users

// const userData = {
//   col: "username",
//   uid: authData.user?.id,
//   username: username,
//   email: email,
//   avatar_url: "",
//   created_at: authData.user?.created_at,
// };

interface UserData {
  col: string;
  uid: string;
  username: string;
  email: string;
  avatar_url: string;
  created_at: string;
}

// Create a new user
export const createUser = async (
  userData: UserData,
): Promise<{
  success: boolean;
  error: boolean;
}> => {
  const supabase = await createClient();

  // const { col, uid, username, email, avatar_url, created_at } = userData;

  const { error } = await supabase.from("users").insert(userData);

  if (error) {
    return { success: false, error: true };
  }

  return { success: true, error: false };
};

// Read user data
export const readUser = async (): Promise<{
  success: boolean;
  error: boolean;
}> => {
  console.log("run readUser");
  const supabase = await createClient();

  const { data: authData, error: authError } = await supabase.auth.getUser();
  console.log("authData", authData);

  if (authError) {
    return { success: false, error: true };
  }
  if (authData) {
    console.log("authData.user.id", authData.user.id);
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("uid", authData.user.id)
      .single();

    if (userError) {
      return { success: false, error: true };
    } else if (userData) {
      return { success: true, error: false };
    }

    return { success: false, error: true };
  }

  return { success: false, error: true };
};

// Update user data
export const updateUser = async () => {};

// Delete user
export const deleteUser = async () => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    return { success: false, error: true };
  }

  return { success: true, error: false };
};
