"use client";
import { useEffect, useState } from "react";
import { readUser } from "@/utils/supabase/actions/crud";
import { ProfileForm } from "./components/Form";

interface Profile {
  id: number;
  uid: string;
  username: string;
  email: string;
  avatar_url: string;
  created_at: string;
}

export default function ProfilePage() {
  // State
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await readUser();

      if (error) {
        setError("Noe gikk galt. Prøv igjen.");
        return;
      } else if (data) {
        setProfile(data);
        return;
      }

      setError("Ingen bruker funnet.");
    };
    fetchUser();
  }, []);

  // const signOut = async () => {
  //   const { error } = await supabase.auth.signOut();
  //
  //   if (error) {
  //     console.error("Error signing out:", error);
  //   }
  //
  //   router.push("/signin");
  //   return;
  // };

  // Update profile page to show user state values
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="grid grid-cols-4 justify-center p-4">
        {error ? (
          <div>{error}</div>
        ) : (
          <div className="col-span-3 uppercase">
            <h2 className="font-semibold text-2xl mb-2">din profil</h2>
            {profile && <ProfileForm data={profile} />}
          </div>
        )}
      </div>
    </main>
  );
}
