"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCountdown } from "@/hooks";

import securityIMG from "~/security.svg";
import { Layout } from "@/components";

const AlreadyAuthenticated = () => {
  const router = useRouter();

  const { secondsLeft, startCountdown, isFinished } = useCountdown(5);

  useEffect(() => {
    startCountdown();
  }, []);

  useEffect(() => {
    if (isFinished) router.push("/");
  }, [isFinished, router]);
  return (
    <Layout
      isNav={false}
      className="flex h-screen flex-col items-center justify-center text-center font-rubik text-black"
    >
      <h3 className="text-2xl">You are already signed in</h3>
      <Image
        src={securityIMG}
        alt="security image"
        className="h-[25rem] w-auto self-center px-8 py-12"
      />
      <p className="text-2xl">You will be redirected in: {secondsLeft}</p>
    </Layout>
  );
};

export default AlreadyAuthenticated;
