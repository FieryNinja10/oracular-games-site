"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import useForm from "@/hooks/useForm";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FormEvent } from "react";

const initialValues: {
  email: string;
  password: string;
} = {
  email: "",
  password: ""
};

const AuthForm = () => {
  const { form, handleChange, resetForm } = useForm(initialValues);

  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center px-4 font-rubik lg:w-[50vw]">
      <div className="w-full max-w-sm text-gray-600">
        <Button
          className="bg-prime hover:bg-second absolute top-4 right-4"
          onClick={() => router.push("/")}
        >
          Back
        </Button>
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
        <form onSubmit={handleSubmit} className="mt-8 space-y-5 font-base">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              required
              onChange={handleChange}
              value={form.email}
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              minLength={6}
              placeholder="Password"
              required
              onChange={handleChange}
              value={form.password}
            />
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
