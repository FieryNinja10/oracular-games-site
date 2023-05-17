import type { Metadata } from "next";

import { Navbar } from "@/components";
import FormIMG from "./FormIMG";
import AuthForm from "./AuthForm";

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in to get back into the action!"
};

const Login = () => {
  return (
    <Navbar color="bg-black/95">
      <div className="flex h-full items-center justify-between">
        <FormIMG />
        <AuthForm />
      </div>
    </Navbar>
  );
};

export default Login;
