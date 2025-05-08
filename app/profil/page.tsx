'use client';
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from 'react';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  // const supabase = createClient();
  // // const { data, error } = await supabase.auth.getSession();
  // const { data, error } = await supabase.auth.getUser();
  //
  // console.log(data);
  // if (error) {
  //   // ... error
  // }

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      // const { data, error } = await supabase.auth.getSession();
      const { data, error } = await supabase.auth.getUser();

      // Get user from users table via the user auth

      // Update user state
      console.log(data);
    }
    fetchUser();
  }, []);

  // Update profile page to show user state values
  return <main>Profil</main>
}
