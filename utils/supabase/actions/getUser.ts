'use server';

import { createClient } from "@/utils/supabase/server";

interface Profile {
  id: number;
  uid: string;
  username: string;
  email: string;
  avatar_url: string;
  created_at: string;
}

export const getUser = async (): Promise<{ data: Profile | null; error: string | null }> => {
  // console.log('run getuser');
  const supabase = await createClient()
  const { data: authData, error: authError } = await getUserId();

  if (authError || !authData?.user) {
    return { data: null, error: "Kan ikke finne brukeren" };
  }

  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("*")
    .eq("uid", authData.user.id)
    .single();

  if (userError) {
    return { data: null, error: "Kan ikke finne brukeren!" };
  }

  return { data: userData, error: null }
}

const getUserId = async () => {
  // console.log('get user id');
  const supabase = await createClient()
  const { data: data, error: error } = await supabase.auth.getUser();

  if (error) {
    return { error };
  }

  return { data }
}
