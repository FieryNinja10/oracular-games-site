"use client";

import Link from "next/link";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
  const form = useForm<z.infer<typeof UserLoginSchema>>({
    resolver: zodResolver(UserLoginSchema)
  });

  const onSubmit = async (formData: z.infer<typeof UserLoginSchema>) => {
    await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      callbackUrl: "/"
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="font-base space-y-5"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState, formState }) => (
            <FormItem>
              <FormLabel className="text-gray-600">Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState, formState }) => (
            <FormItem>
              <FormLabel className="text-gray-600">Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full bg-prime text-white hover:bg-rad active:bg-darkRad">
          Log in
        </Button>
        <div className="text-center font-nunito">
          <Link href="/" className="hover:text-rad">
            Forgot password?
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default AuthForm;
