"use client";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUser } from "@/utils/supabase/actions/getUser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UsernameInput } from "@/app/profil/components/UsernameInput";
import { EmailInput } from "@/app/profil/components/EmailInput";
import { AvatarInput } from "./components/AvatarInput";
import { ProfileForm } from "./components/Form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  // console.log("profile", profile);

  // Router
  const router = useRouter();

  // Supabase client
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await getUser();

      if (error) {
        setError(error);
      }

      console.log("user data", data);
      console.log("user error", error);

      setProfile(data);
    };
    fetchUser();
  }, []);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error signing out:", error);
    }

    router.push("/signin");
    return;
  };

  // Update profile page to show user state values
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="grid grid-cols-4 justify-center p-4">
        <div className="space-y-4">
          <Avatar>
            <AvatarImage src={profile?.avatar_url} />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <Button onClick={() => signOut()}>Logg ut</Button>
        </div>
        {error ? (
          <div>{error}</div>
        ) : (
          <div className="col-span-3 uppercase">
            <h2 className="font-semibold text-2xl mb-2">din profil</h2>
            <div className="space-y-4">
              {/*
              TODO:
              Add props to pass user id + username (add types)
              */}
              {/* <UsernameInput /> */}
              {/* <EmailInput /> */}
              {/* <AvatarInput /> */}
              <div className="">Opprettet: {profile?.created_at}</div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
