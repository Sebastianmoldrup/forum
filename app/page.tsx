"use client";
import { Button } from "@/components/ui/button";
import { getUser } from "@/utils/supabase/actions/getUser";
// import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [signedIn, setSignedIn] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      const x = await getUser();
      console.log(x);

      // const supabase = createClient();
      // // const { data, error } = await supabase.auth.getSession();
      // const { data, error } = await supabase.auth.getUser();
      //
      // if (error) {
      //   console.log();
      // }
      //
      // // Get user from users table via the user auth
      //
      // // Update user state
      // console.log(data);

    };
    fetchUser();
  }, []);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold max-w-[170px]">
          Velkommen, til Forum
        </h1>
        <div className="w-full space-x-4">
          <Button>
            <Link href={"signup"}>Opprett konto</Link>
          </Button>
          <Button>
            <Link href={"signin"}>Logg inn</Link>
          </Button>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center border-2 border-amber-100 w-full"></footer>
    </div>
  );
}
