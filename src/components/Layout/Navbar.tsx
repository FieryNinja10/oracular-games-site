"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

import { block } from "million/react";

import logo from "~/logo-transparent.png";
import { Button, buttonVariants } from "@/components/ui/button";

const Navbar = block(({ color }: { color?: string }) => {
  const router = useRouter();

  // button variable
  const [normalButton, setNormalButton] = useState("Log In");
  const [redButton, setRedButton] = useState("Sign Up");
  const [redButtonLink, setRedButtonLink] = useState("/signup");

  const [normalButtonHandler, setNormalButtonHandler] = useState<() => void>(
    () => router.push("/login"),
  );

  //check authentication
  const { data, status, update } = useSession();

  // Basic Navbar Functionality
  const [navbarMenuState, setNavbarMenuState] = useState(false);

  const [scrolled, setScrolled] = useState(false);

  const checkScrolled = () => {
    if (window.scrollY >= 25) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScrolled);
  }, []);

  // button name changer
  useEffect(() => {
    if (status === "authenticated") {
      setNormalButton("Log Out");
      setRedButton("Dashboard");
      setRedButtonLink("/dashboard");

      setNormalButtonHandler(() =>
        signOut({ callbackUrl: "/", redirect: true }),
      );
    } else {
      setNormalButton("Log In");
      setRedButton("Sign Up");
      setRedButtonLink("/signup");

      setNormalButtonHandler(() => router.push("/login"));
    }
  }, [status, router]);

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-10 flex w-full justify-between bg-prime font-rubik text-white transition-all ${
        color === undefined ? "bg-prime" : color
      }`}
    >
      <div className="flex w-full justify-between px-4">
        <div className="flex">
          {/* LOGO */}

          <Link
            href="/"
            className="flex cursor-pointer items-center justify-center py-[5px] transition-all hover:bg-second md:px-[5px]"
          >
            <Image src={logo} alt="oracular games logo" className="h-12 w-12" />
          </Link>
          {/* Links */}
          <div
            className={`absolute left-0 right-0 top-0 flex-col bg-prime font-semibold uppercase transition-all md:static md:flex-row md:bg-transparent ${
              navbarMenuState ? "left-0" : "left-[100vw] md:flex"
            }`}
          >
            <Button
              type="button"
              className={`absolute right-4 top-2 bg-transparent hover:bg-transparent focus:bg-second md:hidden ${
                navbarMenuState ? "flex" : "hidden"
              }`}
              onClick={() => {
                setNavbarMenuState(false);
              }}
            >
              <X />
            </Button>
            <div className="h-screen items-center justify-center md:flex md:h-auto ">
              <Link
                href="/news"
                className="block min-h-[37px] w-auto cursor-pointer py-4 text-center decoration-rad decoration-solid underline-offset-[0.3rem] transition-all hover:bg-second hover:underline hover:decoration-rad hover:decoration-solid hover:decoration-4 md:inline-block md:h-[69px] md:px-4"
                onClick={() => setNavbarMenuState(!navbarMenuState)}
              >
                <p className="pt-2">News</p>
              </Link>
              <Link
                href="/games"
                className="block min-h-[37px] w-auto cursor-pointer py-4 text-center decoration-rad decoration-solid underline-offset-[0.3rem] transition-all hover:bg-second hover:underline hover:decoration-rad hover:decoration-solid hover:decoration-4 md:inline-block md:h-[69px] md:px-4"
                onClick={() => setNavbarMenuState(!navbarMenuState)}
              >
                <p className="pt-2">Games</p>
              </Link>
              <Link
                href="/team"
                className="block min-h-[37px] w-auto cursor-pointer py-4 text-center decoration-rad decoration-solid underline-offset-[0.3rem] transition-all hover:bg-second hover:underline hover:decoration-rad hover:decoration-solid hover:decoration-4 md:inline-block md:h-[69px] md:px-4"
                onClick={() => setNavbarMenuState(!navbarMenuState)}
              >
                <p className="pt-2">Meet the Team</p>
              </Link>
              <Link
                href="https://www.patreon.com/oraculargames"
                target="_blank"
                rel="noreferrer"
                className="block min-h-[37px] w-auto cursor-pointer py-4 text-center decoration-rad decoration-solid underline-offset-[0.3rem] transition-all hover:bg-second hover:underline hover:decoration-rad hover:decoration-solid hover:decoration-4 md:inline-block md:h-[69px] md:px-4"
                onClick={() => setNavbarMenuState(!navbarMenuState)}
              >
                <p className="pt-2">Support Us</p>
              </Link>
            </div>
          </div>
        </div>
        {/* Sign up/Log in */}
        <div className="flex content-center items-center justify-center">
          <Button
            className="mx-3 bg-transparent font-normal hover:bg-second"
            onClick={normalButtonHandler}
          >
            {normalButton}
          </Button>
          <Link
            type="button"
            className={cn(
              buttonVariants({
                variant: "default",
              }),
              "mx-3 bg-rad font-normal hover:bg-darkRad",
            )}
            href={redButtonLink}
          >
            {redButton}
          </Link>
          {/* Hamburger for mobile */}
          <div className="md:hidden">
            <Button
              type="button"
              className="bg-transparent hover:bg-transparent focus:bg-second"
              onClick={() => {
                setNavbarMenuState(true);
              }}
            >
              <Menu />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
});

export default Navbar;
