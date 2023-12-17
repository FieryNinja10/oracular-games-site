import Link from "next/link";
import type { Metadata } from "next";

import AuthForm from "./AuthForm";
import { Layout } from "@/components";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Reset you password to start playing again!",
};

const ResetPassword = () => {
  return (
    <Layout
      className="flex min-h-screen items-center justify-between"
      isNav={false}
    >
      <main className="flex h-full w-screen flex-col items-center justify-center px-4 font-rubik">
        <div className="w-full max-w-lg rounded-3xl border-8 border-second bg-black/10 p-12 text-gray-600">
          <Link
            href="/"
            className={buttonVariants({
              variant: "default",
              className:
                "fixed right-4 top-4 bg-prime text-white hover:bg-second",
            })}
          >
            Back
          </Link>
          <div className="text-center">
            <div className="mt-5 space-y-2">
              <h3 className="text-2xl font-bold text-gray-800 sm:text-3xl">
                Reset your password
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
          <Separator className="my-2 bg-gray-800" />
          <AuthForm />
        </div>
      </main>
    </Layout>
  );
};

export default ResetPassword;
