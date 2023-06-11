import type { Metadata } from "next";

import FormIMG from "./FormIMG";
import AuthForm from "./AuthForm";

export const metadata: Metadata = {
  title: "Sign up",
  description: "Sign up to start playing!"
};

const Signup = () => {
  return (
    <div className="flex h-full items-center justify-between">
      <FormIMG />
      <AuthForm />
    </div>
  );
};

export default Signup;
