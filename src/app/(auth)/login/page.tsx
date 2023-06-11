import type { Metadata } from "next";

import FormIMG from "./FormIMG";
import AuthForm from "./AuthForm";

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in to get back into the action!"
};

const Login = () => {
  return (
    <div className="flex h-full items-center justify-between">
      <FormIMG />
      <AuthForm />
    </div>
  );
};

export default Login;
