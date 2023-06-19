import type { Metadata } from "next";

import FormIMG from "./FormIMG";
import AuthForm from "./AuthForm";
import { Layout } from "@/components";

export const metadata: Metadata = {
  title: "Sign up",
  description: "Sign up to start playing!"
};

const Signup = () => {
  return (
    <Layout
      className="flex h-screen items-center justify-between"
      isNav={false}
    >
      <FormIMG />
      <AuthForm />
    </Layout>
  );
};

export default Signup;
