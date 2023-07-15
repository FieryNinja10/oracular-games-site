"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button, buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { UserRegisterSchema, UserRegisterType } from "@/types";
import { signIn } from "next-auth/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const AuthForm = () => {
  const UserSignUpSchema = UserRegisterSchema.merge(
    z.object({
      tosPrivacy: z.boolean()
    })
  );

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<z.infer<typeof UserSignUpSchema>>({
    resolver: zodResolver(UserSignUpSchema)
  });

  const router = useRouter();

  const submit = async (formData: z.infer<typeof UserSignUpSchema>) => {
    if (!formData.tosPrivacy) {
      // throw toast error
      return;
    }

    const { email, password, username, birthday, newsletter } =
      UserRegisterSchema.parse({
        email: formData.email,
        password: formData.password,
        username: formData.username,
        birthday: formData.birthday,
        newsletter: formData.newsletter
      });

    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password, username, birthday, newsletter })
    });
    const data = await res.json();

    if (!data.user) {
      // throw toast error with data.message
      return;
    }
    signIn("credentials", {
      email: data.user.email,
      password,
      callbackUrl: "/"
    });
  };

  return (
    <main className="flex h-full w-screen flex-col items-center justify-center px-4 font-rubik lg:w-[50vw]">
      <div className="w-full max-w-sm text-gray-600">
        <Link
          href="/"
          className={buttonVariants({
            variant: "default",
            className: "fixed right-4 top-4 bg-prime hover:bg-second"
          })}
        >
          Back
        </Link>
        <div className="text-center">
          <div className="mt-5 space-y-2">
            <h3 className="text-2xl font-bold text-gray-800 sm:text-3xl">
              Sign Up
            </h3>
            <p className="font-nunito">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-prime hover:text-rad"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
        <Separator className="my-4" />
        <form
          onSubmit={handleSubmit(submit)}
          className="mt-8 space-y-5 text-base"
        >
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="Email"
              className="placeholder:text-gray-500 focus-visible:text-gray-600"
              required
              {...register("email")}
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              minLength={6}
              placeholder="Password"
              className="placeholder:text-gray-500 focus-visible:text-gray-600"
              required
              {...register("password")}
            />
          </div>
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              id="username"
              placeholder="Username"
              className="placeholder:text-gray-500 focus-visible:text-gray-600"
              required
              {...register("username")}
            />
          </div>
          <div>
            <Label htmlFor="birthday">Birthday</Label>
            <Input
              type="date"
              id="birthday"
              className="text-gray-500 focus-visible:text-gray-600"
              required
              {...register("birthday")}
            />
          </div>
          <div className="flex">
            <Checkbox
              id="newsletter"
              className="mr-2"
              required
              {...register("newsletter")}
            />
            <Label htmlFor="newsletter">Sign up for newsletter</Label>
          </div>
          <div className="flex">
            <Checkbox id="tosPrivacy" className="mr-2" required />
            <Label htmlFor="tosPrivacy">
              You agree to the{" "}
              <Link href="/terms" className="underline hover:text-rad">
                Terms of Service
              </Link>{" "}
              and the{" "}
              <Link href="/privacy" className="underline hover:text-rad">
                Privacy Policy
              </Link>
            </Label>
          </div>
          <Button className="w-full bg-prime hover:bg-rad active:bg-darkRad">
            Sign up
          </Button>
          <div className="text-center font-nunito">
            <Link href="javascript:void(0)" className="hover:text-rad">
              Forgot password?
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default AuthForm;
