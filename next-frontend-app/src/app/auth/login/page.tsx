"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { request } from "graphql-request";
import useSWR from "swr";

import {
  Card,
  CardTitle,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const fetcher = (query: any) => request("http://localhost:8080/graphql", query);

const loginInit = {
  email: "",
  password: "",
};

const formSchema = z.object({
  email: z.string().email().min(5, {
    message: "Enter your valid email address",
  }),
  password: z.string().min(6, {
    message: "Enter your password",
  }),
});

export default function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: loginInit,
  });

  // 2. Define a submit handler.
  function OnSubmit(values: z.infer<typeof formSchema>) {
    // ✅ This will be type-safe and validated. Do something with the form values.

    const { data, error } = useSWR(
      `{
        login(email: ${values.email}, password: ${values.password}) {token userId}
      }`,
      fetcher
    );
    console.log(error);
    console.log(data);
  }

  return (
    <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
      <Card className="mx-auto w-full max-w-xl">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your information to login into your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(OnSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="test@email.com" {...field} />
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="*******" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Create an account
              </Button>
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Dont have an account?{" "}
            <Link href="/auth/register" className="underline">
              Register
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
