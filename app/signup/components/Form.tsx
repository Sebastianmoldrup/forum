"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signUp } from "@/utils/supabase/actions/signUp";
import { useRouter } from "next/navigation";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email({ message: "Ugyldig e-postadresse" }),
  username: z
    .string()
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Brukernavn kan bare inneholde bokstaver og tall",
    })
    .min(3, { message: "Brukernavn må være minst 3 bokstaver" })
    .max(50, { message: "Brukernavn kan ikke være lengre en 50 bokstaver" }),
  password: z
    .string()
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Passord kan bare inneholde bokstaver og tall",
    })
    .min(4, { message: "Brukernavn må være minst 4 bokstaver" })
    .max(50, { message: "Brukernavn kan ikke være lengre en 50 bokstaver" }),
});

export function SignUpForm() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log("Form values:", values);
    const { validated, error } = await signUp(values);
    if (!validated || error) {
      // console.error("Error:", error);
      setError(error);
    } else if (validated) {
      router.push("/");
    }
  }

  return (
    <>
      {error && <div className="text-red-500">{error}</div>}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brukernavn</FormLabel>
                <FormControl>
                  <Input placeholder="Brukernavn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Passord</FormLabel>
                <FormControl>
                  <Input placeholder="Passord" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Lag ny bruker</Button>
        </form>
      </Form>
    </>
  );
}
