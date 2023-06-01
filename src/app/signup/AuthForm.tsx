"use client";

import Link from "next/link";

import useForm from "@/hooks/useForm";

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
        <form onSubmit={(e) => e.preventDefault()} className="mt-8 space-y-5">
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
              value={form.email}
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
              value={form.password}
            />
          </div>
          <div>
            <label className="font-medium" htmlFor="username">
              Username
            </label>
            <input
              type="username"
              id="username"
              name="username"
              placeholder="Username"
              required
              className="mt-2 w-full rounded-lg border bg-transparent px-3 py-2 text-gray-500 shadow-sm outline-none focus:border-primary"
              onChange={handleChange}
              value={form.username}
            />
          </div>
          <div>
            <label className="font-medium" htmlFor="birthday">
              Birthday
            </label>
            <input
              type="birthday"
              id="birthday"
              name="birthday"
              placeholder="Birthday"
              required
              className="mt-2 w-full rounded-lg border bg-transparent px-3 py-2 text-gray-500 shadow-sm outline-none focus:border-primary"
              onChange={handleChange}
              value={form.age}
            />
          </div>
          <button className="w-full rounded-lg bg-primary px-4 py-2 font-medium text-white duration-150 hover:bg-rad active:bg-darkRad">
            Sign up
          </button>
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
