"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { signIn } from "next-auth/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const AuthForm = () => {
  const UserLoginSchema = z.object({
    email: z.string().email(),
    password: z.string({
      required_error: "Password is required"
    })
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<z.infer<typeof UserLoginSchema>>({
    resolver: zodResolver(UserLoginSchema)
  });

  const router = useRouter();

  const onSubmit = async (formData: z.infer<typeof UserLoginSchema>) => {
    await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      callbackUrl: "/"
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="font-base space-y-5">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          placeholder="Email"
          {...register("email", {
            required: {
              value: true,
              message: "Email is required"
            }
          })}
        />
        {errors.email && (
          <Badge variant="destructive" className="my-2">
            {errors.email.message}
          </Badge>
        )}
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          placeholder="Password"
          {...register("password", {
            required: {
              value: true,
              message: "Password is required"
            }
          })}
        />
        {errors.password && (
          <Badge variant="destructive" className="my-2">
            {errors.password.message}
          </Badge>
        )}
      </div>
      <Button className="w-full bg-prime text-white hover:bg-rad active:bg-darkRad">
        Log in
      </Button>
      <div className="text-center font-nunito">
        <Link href="/" className="hover:text-rad">
          Forgot password?
        </Link>
      </div>
    </form>
  );
};

export default AuthForm;
