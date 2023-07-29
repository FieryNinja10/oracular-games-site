"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";

import { signIn } from "next-auth/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const UserLoginSchema = z.object({
  email: z.string().email(),
  password: z.string({
    required_error: "Password is required"
  })
});

const AuthForm = () => {
  const [errorMessage, setErrorMessage] = useState<string>();
  // check if user is already authenticated
  const session = useSession();
  const router = useRouter();
  if (session.status === "authenticated") router.push("/already-authenticated");

  const form = useForm<z.infer<typeof UserLoginSchema>>({
    resolver: zodResolver(UserLoginSchema)
  });

  const onSubmit = async (formData: z.infer<typeof UserLoginSchema>) => {
    const res = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      callbackUrl: "/"
    });
    console.log(res);

    if (res === undefined) setErrorMessage("Email or password is incorrect");
    else if (res.ok!) setErrorMessage(res.error);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="font-base space-y-5"
      >
        {errorMessage && errorMessage !== "" && errorMessage !== " " && (
          <Badge variant="destructive" className="py-1 text-sm">
            {errorMessage}
          </Badge>
        )}
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState, formState }) => (
            <FormItem>
              <FormLabel className="text-gray-600">Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Email"
                  className="ring-gray-300"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field, fieldState, formState }) => (
            <FormItem>
              <FormLabel className="text-gray-600">Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Password"
                  className="ring-gray-300"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full bg-prime text-white hover:bg-rad active:bg-darkRad">
          Log in
        </Button>
        <div className="text-center font-nunito">
          <Link href="/forgot-password" className="hover:text-rad">
            Forgot password?
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default AuthForm;
