"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

import logo from "~/logo.png";
import { Button, buttonVariants } from "@/components/ui/button";

const Navbar = ({ color }: { color?: string }) => {
  // Basic Navbar Functionality
  const [navbarMenuState, setNavbarMenuState] = useState(false);

  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

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
            className="cursor-pointer py-4 hover:bg-second md:px-4 transition-all"
          >
            <Image
              src={logo}
              alt="oracular games logo"
              className="h-[37px] w-[37px]"
            />
          </Link>
          {/* Links */}
          <div
            className={`absolute left-0 right-0 top-0 flex-col bg-prime font-semibold uppercase transition-all md:static md:flex-row md:bg-transparent ${
              navbarMenuState ? "left-0" : "left-[100vw] md:flex"
            }`}
          >
            <Button
              type="button"
              className={`absolute right-4 top-2 bg-transparent focus:bg-second hover:bg-transparent md:hidden ${
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
                className="block md:inline-block min-h-[37px] transition-all underline-offset-[0.3rem] decoration-solid decoration-rad hover:underline hover:decoration-solid hover:decoration-rad hover:decoration-4 cursor-pointer py-4 text-center hover:bg-second w-auto md:px-4 md:h-[69px]"
                onClick={() => setNavbarMenuState(!navbarMenuState)}
              >
                <p className="pt-2">News</p>
              </Link>
              <Link
                href="/games"
                className="block md:inline-block min-h-[37px] transition-all underline-offset-[0.3rem] decoration-solid decoration-rad hover:underline hover:decoration-solid hover:decoration-rad hover:decoration-4 cursor-pointer py-4 text-center hover:bg-second w-auto md:px-4 md:h-[69px]"
                onClick={() => setNavbarMenuState(!navbarMenuState)}
              >
                <p className="pt-2">Games</p>
              </Link>
              <Link
                href="/team"
                className="block md:inline-block min-h-[37px] transition-all underline-offset-[0.3rem] decoration-solid decoration-rad hover:underline hover:decoration-solid hover:decoration-rad hover:decoration-4 cursor-pointer py-4 text-center hover:bg-second w-auto md:px-4 md:h-[69px]"
                onClick={() => setNavbarMenuState(!navbarMenuState)}
              >
                <p className="pt-2">Meet the Team</p>
              </Link>
              <Link
                href="https://www.patreon.com/oraculargames"
                target="_blank"
                rel="noreferrer"
                className="block md:inline-block min-h-[37px] transition-all underline-offset-[0.3rem] decoration-solid decoration-rad hover:underline hover:decoration-solid hover:decoration-rad hover:decoration-4 cursor-pointer py-4 text-center hover:bg-second w-auto md:px-4 md:h-[69px]"
                onClick={() => setNavbarMenuState(!navbarMenuState)}
              >
                <p className="pt-2">Support Us</p>
              </Link>
            </div>
          </div>
        </div>
        {/* Sign up/Log in */}
        <div className="flex content-center items-center justify-center">
          <Link
            type="button"
            className={cn(
              buttonVariants({
                variant: "default"
              }),
              "bg-transparent hover:bg-second font-normal mx-3"
            )}
            href="/login"
          >
            Log In
          </Link>
          <Link
            type="button"
            className={cn(
              buttonVariants({
                variant: "default"
              }),
              "bg-rad hover:bg-darkRad font-normal mx-3"
            )}
            href="/signup"
          >
            Sign Up
          </Link>
          {/* Hamburger for mobile */}
          <div className="md:hidden">
            <Button
              type="button"
              className="bg-transparent focus:bg-second hover:bg-transparent"
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
};

export default Navbar;
