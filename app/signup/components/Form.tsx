"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
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
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import { register } from "@/app/signup/actions/register";
import { userInfo } from "node:os";
import Router from "next/router";

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
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
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
    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });

      if (error) {
        if (error.message === "User already registered") {
          setErrorMsg("Denne e-postadressen er allerede i bruk.");
        } else {
          setErrorMsg("Det oppstod en feil under registreringen.");
        }

        setError(true);
        return;
      }

      // Check if user was created successfully
      if (data?.user?.id) {
        // Store user info in userData obj
        const userData = {
          uid: data.user.id,
          email: values.email,
          username: values.username,
          avatar_url: "",
          created_at: data.user.created_at,
        }
        // Run server action to register user in users table
        await register(userData);
      }

      router.push('/');
    } catch (error) {
      setError(true);
      setErrorMsg("Noe gikk galt på serveren");
      console.error("Unexpected error:", error);
    }
  }

  return (
    <>
      {error && errorMsg ? <div>{errorMsg}</div> : null}
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
