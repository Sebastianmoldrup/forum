'use server';

import { createClient } from "@/utils/supabase/server";

export const register = async ({
  created_at,
  uid,
  username,
  email,
  avatar_url
}:
  {
    created_at: string,
    uid: string,
    username: string,
    email: string,
    avatar_url: string
  }) => {
  const supabase = await createClient();

  const { error } = await supabase
    .from('users')
    .insert({ uid: uid, username: username, email: email, avatar_url: avatar_url, created_at: created_at });
  console.log('register run');

  if (error) {
    console.error('error:', error);
  }
}
