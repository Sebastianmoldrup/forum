"use client";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      // const { data, error } = await supabase.auth.getSession();
      const { data, error } = await supabase.auth.getUser();

      // Get user from users table via the user auth

      // Update user state
      console.log(data);
    };
    fetchUser();
  }, []);

  const signOut = async () => {
    const supabase = createClient();
    console.log("signing out");
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error signing out:", error);
    }
    return;
  };
  // Update profile page to show user state values
  return (
    <main>
      <div>
        <h2>Din profil</h2>
        <Button onClick={() => signOut()}>Logg ut</Button>
      </div>
    </main>
  );
}
