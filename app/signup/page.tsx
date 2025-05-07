import { SignUpForm } from "@/app/signup/components/Form";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 gap-y-8">
      <div className="flex flex-col items-start justify-center w-full space-y-4 max-w-md p-4 bg-white rounded-lg shadow-md">
        <h1 className="text-4xl font-bold">Opprett en ny konto</h1>
        <SignUpForm />
      </div>
      <div className="w-full space-x-4 max-w-md">
        <Button>
          <Link href={"login"}>Allerede opprettet?</Link>
        </Button>
      </div>
    </main>
  );
}
