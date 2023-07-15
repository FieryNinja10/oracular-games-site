"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { UserRegisterSchema } from "@/types";
import { signIn } from "next-auth/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const initialValues: {
  email: string;
  password: string;
} = {
  email: "",
  password: ""
};

const AuthForm = () => {
  const UserLoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, "Password should be at least 6 characters")
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<z.infer<typeof UserLoginSchema>>({
    resolver: zodResolver(UserLoginSchema)
  });

  const router = useRouter();

  const submit = async (formData: z.infer<typeof UserLoginSchema>) => {
    await signIn("credentials", {
      email: formData.email,
      password: formData.password,
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
              Log in to your account
            </h3>
            <p className="font-nunito">
              {"Don't"} have an account?{" "}
              <Link
                href="/signup"
                className="font-medium text-prime hover:text-rad"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
        <Separator className="my-4" />
        <form onSubmit={handleSubmit(submit)} className="font-base space-y-5">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="Email"
              required
              {...register("email")}
            />
            {errors.email && (
              <Badge variant="destructive">{errors.email.message}</Badge>
            )}
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              minLength={6}
              placeholder="Password"
              required
              {...register("password")}
            />
            {errors.password && (
              <Badge variant="destructive">{errors.password.message}</Badge>
            )}
          </div>
          <Button className="w-full bg-prime hover:bg-rad active:bg-darkRad">
            Log in
          </Button>
          <div className="text-center font-nunito">
            <a href="javascript:void(0)" className="hover:text-rad">
              Forgot password?
            </a>
          </div>
        </form>
      </div>
    </main>
  );
};

export default AuthForm;
