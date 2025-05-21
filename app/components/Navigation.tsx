"use client";
import Link from "next/link";
import { useAuth } from "@/app/providers/Auth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Navigation() {
  const { authStatus, userData } = useAuth();
  console.log("userData", userData());

  return (
    <nav className="flex justify-between items-center p-4 md:px-8">
      <div className="bg-amber-200 py-2 px-4 rounded-xs">
        <Link href="/">Forum</Link>
      </div>
      {authStatus() && (
        <ul className="flex items-center space-x-6">
          <li>
            <Link href="/">Hjem</Link>
          </li>
          <li>
            <Link href="/groups">Grupper</Link>
          </li>
          <li>
            <Link href="/profile">Profil</Link>
          </li>
          <li>
            <Button variant="secondary" onClick={() => console.log("sign out")}>
              Logg ut
            </Button>
          </li>
          <li>
            <Avatar>
              <AvatarImage src={userData()?.avatar_url} alt="Profile picture" />
              <AvatarFallback className="bg-amber-200">
                {userData()?.username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </li>
        </ul>
      )}
    </nav>
  );
}
