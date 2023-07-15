"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { UserRegisterSchema } from "@/types";
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

  const onSubmit = async (formData: z.infer<typeof UserSignUpSchema>) => {
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
    await signIn("credentials", {
      email: data.user.email,
      password,
      callbackUrl: "/"
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-8 space-y-5 text-base"
    >
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          placeholder="Email"
          className="placeholder:text-gray-500 focus-visible:text-gray-600"
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
          className="placeholder:text-gray-500 focus-visible:text-gray-600"
          {...register("password", {
            required: {
              value: true,
              message: "Password is required"
            },
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters"
            }
          })}
        />
        {errors.password && (
          <Badge variant="destructive" className="my-2">
            {errors.password.message}
          </Badge>
        )}
      </div>
      <div>
        <Label htmlFor="username">Username</Label>
        <Input
          type="text"
          id="username"
          placeholder="Username"
          className="placeholder:text-gray-500 focus-visible:text-gray-600"
          {...register("username", {
            required: false
          })}
        />
        {errors.username && (
          <Badge variant="destructive" className="my-2">
            {errors.username.message}
          </Badge>
        )}
      </div>
      <div>
        <Label htmlFor="birthday">Birthday</Label>
        <Input
          type="date"
          id="birthday"
          className="text-gray-500 focus-visible:text-gray-600"
          {...register("birthday", {
            required: {
              value: true,
              message: "Birthday is required"
            },
            valueAsDate: true
          })}
        />
        {errors.birthday && (
          <Badge variant="destructive" className="my-2">
            {errors.birthday.message}
          </Badge>
        )}
      </div>
      <div className="flex">
        <Checkbox
          id="newsletter"
          className="mr-2"
          {...register("newsletter", {
            required: false
          })}
        />
        <Label htmlFor="newsletter">Sign up for newsletter</Label>
        {errors.newsletter && (
          <Badge variant="destructive" className="mx-2">
            {errors.newsletter.message}
          </Badge>
        )}
      </div>
      <div className="flex">
        <Checkbox
          id="tosPrivacy"
          className="mr-2"
          {...register("tosPrivacy", {
            required: {
              value: true,
              message:
                "You must agree to the Terms of Service and the Privacy Policy"
            }
          })}
        />
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
        {errors.tosPrivacy && (
          <Badge variant="destructive" className="mx-2">
            {errors.tosPrivacy.message}
          </Badge>
        )}
      </div>
      <Button className="w-full bg-prime text-white hover:bg-rad active:bg-darkRad">
        Sign up
      </Button>
    </form>
  );
};

export default AuthForm;
