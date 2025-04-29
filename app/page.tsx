import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
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
            <Link href={"login"}>Logg inn</Link>
          </Button>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center border-2 border-amber-100 w-full"></footer>
    </div>
  );
}
