import type { Metadata } from "next";

import FormIMG from "./FormIMG";
import AuthForm from "./AuthForm";
import { Layout } from "@/components";

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in to get back into the action!"
};

const Login = () => {
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

export default Login;
