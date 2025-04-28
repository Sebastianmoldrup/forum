import { LoginForm } from "@/app/login/components/LoginForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 gap-y-8">
      <div className="flex flex-col items-start justify-center w-full space-y-4 max-w-md p-4 bg-white rounded-lg shadow-md">
        <h1 className="text-4xl font-bold">Velkommen, til Forum</h1>
        <LoginForm />
      </div>
      <div className="w-full space-x-4 max-w-md">
        <Button>
          <Link href={"signup"}>Opprett konto</Link>
        </Button>
        <Button>
          <Link href={"recover"}>Glemt passord?</Link>
        </Button>
      </div>
    </main>
  );
}
