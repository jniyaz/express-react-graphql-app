"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const registerInit = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const formSchema = z.object({
  firstName: z.string().min(4, {
    message: "Enter your first name",
  }),
  lastName: z.string().min(4, {
    message: "Enter your last name",
  }),
  email: z.string().email().min(5, {
    message: "Enter your valid email address",
  }),
  password: z.string().min(6, {
    message: "Enter your password",
  }),
});

export default function Register() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: registerInit,
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    alert(JSON.stringify(values, null, 2));
  }

  return (
    <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
      {/* <div className="mx-auto grid w-full max-w-6xl gap-2">
        <h1 className="text-3xl font-semibold">Register</h1>
      </div> */}
      <Card className="mx-auto w-full max-w-xl">
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Niyaz" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Jamal" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
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
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="*******"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                        <FormDescription>
                          Enter strong password.
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Create an account
                </Button>
                <Button variant="outline" className="w-full">
                  Register with Google
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link href="/auth/login" className="underline">
                  Login
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}
