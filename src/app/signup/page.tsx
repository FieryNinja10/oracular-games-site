import type { Metadata } from "next";

import { Navbar } from "@/components";
import FormIMG from "./FormIMG";
import AuthForm from "./AuthForm";

export const metadata: Metadata = {
  title: "Sign up",
  description: "Sign up to start playing!"
};

const Signup = () => {
  return (
    <Navbar>
      <div className="flex h-full items-center justify-between">
        <AuthForm />
        <FormIMG />
      </div>
    </Navbar>
  );
};

export default Signup;
