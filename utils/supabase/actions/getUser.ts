'use server';

import { createClient } from "@/utils/supabase/server";


export const getUser = async () => {
  // console.log('run getuser');
  const supabase = await createClient()
  const { data: authData, error: authError } = await getUserId();

  if (authError || !authData?.user) {
    return { user: null, error: authError || new Error("No user found") };
  }

  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("*")
    .eq("uid", authData.user.id)
    .single();

  if (userError) {
    return { user: null, error: null };
  }

  return { user: userData, error: null }
}

const getUserId = async () => {
  // console.log('get user id');
  const supabase = await createClient()
  const { data: data, error: error } = await supabase.auth.getUser();

  if (error) {
    return { error };
  }
  // console.log(data);

  return { data }
}
