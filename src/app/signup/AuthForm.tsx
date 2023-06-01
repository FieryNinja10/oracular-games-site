"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

import useForm from "@/hooks/useForm";
import { useAuthStore } from "@/context";
import { UserDataType } from "@/types";

const initialValues: UserDataType = {
  email: "",
  password: "",
  name: "",
  gamerTag: "",
  tag: "",
  region: "",
  age: new Date()
};

const AuthForm = () => {
  const { form, handleChange, resetForm } = useForm(initialValues);
  const [part, setPart] = useState(1);

  const signUp = useAuthStore((state) => state.signUp);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signUp(form);
  };

  return (
    <main className="flex h-full w-screen flex-col items-center justify-center px-4 font-rubik lg:w-[50vw]">
      <div className="w-full max-w-sm text-gray-600">
        <div className="text-center">
          <div className="mt-5 space-y-2">
            <h3 className="text-2xl font-bold text-gray-800 sm:text-3xl">
              Sign Up
            </h3>
            <p className="font-nunito">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-primary hover:text-rad"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
        {part === 1 ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setPart(2);
            }}
            className="mt-8 space-y-5"
          >
            <div>
              <label className="font-medium" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                required
                className="mt-2 w-full rounded-lg border bg-transparent px-3 py-2 text-gray-500 shadow-sm outline-none focus:border-primary"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="font-medium" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                minLength={6}
                placeholder="Password"
                required
                className="mt-2 w-full rounded-lg border bg-transparent px-3 py-2 text-gray-500 shadow-sm outline-none focus:border-primary"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="font-medium" htmlFor="name">
                Name
              </label>
              <input
                type="name"
                id="name"
                name="name"
                placeholder="Name"
                required
                className="mt-2 w-full rounded-lg border bg-transparent px-3 py-2 text-gray-500 shadow-sm outline-none focus:border-primary"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="font-medium" htmlFor="birthday">
                Birthday
              </label>
              <input
                type="date"
                id="birthday"
                name="birthday"
                placeholder="Birthday"
                required
                className="mt-2 w-full rounded-lg border bg-transparent px-3 py-2 text-gray-500 shadow-sm outline-none focus:border-primary"
                onChange={handleChange}
              />
            </div>
            <button className="w-full rounded-lg bg-primary px-4 py-2 font-medium text-white duration-150 hover:bg-rad active:bg-darkRad">
              Next
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="font-medium" htmlFor="gamertag">
                Gamer-Tag
              </label>
              <input
                type="gamertag"
                id="gamertag"
                name="gamertag"
                placeholder="Gamer-Tag"
                className="mt-2 w-full rounded-lg border bg-transparent px-3 py-2 text-gray-500 shadow-sm outline-none focus:border-primary"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="font-medium" htmlFor="region">
                Region
              </label>
              <input
                type="region"
                id="region"
                name="region"
                minLength={6}
                placeholder="Region"
                className="mt-2 w-full rounded-lg border bg-transparent px-3 py-2 text-gray-500 shadow-sm outline-none focus:border-primary"
                onChange={handleChange}
              />
            </div>
            <button className="w-full rounded-lg bg-primary px-4 py-2 font-medium text-white duration-150 hover:bg-rad active:bg-darkRad">
              Sign up
            </button>
          </form>
        )}
      </div>
    </main>
  );
};

export default AuthForm;
