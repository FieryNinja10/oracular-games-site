"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import useForm from "@/hooks/useForm";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FormEvent } from "react";

const initialValues: {
  username: string;
  age: string;
  email: string;
  password: string;
} = {
  username: "",
  age: "",
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
        <form onSubmit={handleSubmit} className="mt-8 space-y-5 text-base">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className="placeholder:text-gray-500 focus-visible:text-gray-600"
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
              className="placeholder:text-gray-500 focus-visible:text-gray-600"
              required
              onChange={handleChange}
              value={form.password}
            />
          </div>
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              className="placeholder:text-gray-500 focus-visible:text-gray-600"
              required
              onChange={handleChange}
              value={form.username}
            />
          </div>
          <div>
            <Label htmlFor="birthday">Birthday</Label>
            <Input
              type="date"
              id="birthday"
              name="birthday"
              className="text-gray-500 focus-visible:text-gray-600"
              required
              onChange={handleChange}
            />
          </div>
          <Button className="w-full bg-prime hover:bg-rad active:bg-darkRad">
            Sign up
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
