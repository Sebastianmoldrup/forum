"use client";
import { Button } from "@/components/ui/button";
import { getUser } from "@/utils/supabase/actions/getUser";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      // const supabase = createClient();
      // const { data: userData, error: userError } = await supabase.auth.getUser();
      const { user: userData, error: userError } = await getUser();
      setUserProfile(userData);
    };
    fetchUser();
    console.log(userProfile);
  }, []);


  const signOut = async () => {
    const supabase = createClient();
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
