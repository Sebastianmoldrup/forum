"use client";
import Link from "next/link";
import { useAuth } from "@/app/providers/Auth";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  const { authStatus } = useAuth();

  return (
    <nav className="flex justify-between items-center p-4 md:px-8">
      <div className="bg-amber-200 py-2 px-4 rounded-xs">
        <Link href="/">Forum</Link>
      </div>
      {authStatus() && (
        <ul className="flex items-center space-x-4">
          <li>
            <Link href="/">Hjem</Link>
          </li>
          <li>
            <Link href="/profil">Profil</Link>
          </li>
          <li>
            <Button variant="secondary" onClick={() => console.log("sign out")}>
              Logg ut
            </Button>
          </li>
        </ul>
      )}
    </nav>
  );
}
