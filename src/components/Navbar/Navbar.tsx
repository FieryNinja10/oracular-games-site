"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { RiMenu3Fill, RiCloseFill } from "react-icons/ri";
import logo from "~/logo.png";

export interface LayoutProps {
  children: React.ReactNode;
  color?: string;
}

const Layout = ({ children, color }: LayoutProps) => {
  // Basic Navbar Functionality
  const [navbar, setNavbar] = useState(false);
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
    <div className="flex h-full w-full flex-col">
      <nav
        className={`fixed left-0 right-0 top-0 z-10 flex w-full justify-between bg-primary font-rubik text-white transition-all ${
          color === undefined ? "bg-primary" : color
        }`}
      >
        <div className="flex w-full justify-between px-4">
          <div className="flex">
            {/* LOGO */}
            <div
              className="cursor-pointer py-4 hover:bg-secondary md:px-4 transition-all"
              onClick={() => {
                router.push("/");
              }}
            >
              <Link href="/">
                <Image
                  src={logo}
                  alt="oracular games logo"
                  className="h-[37px] w-[37px]"
                />
              </Link>
            </div>
            {/* Links */}
            <div
              className={`absolute left-0 right-0 top-0 flex-col bg-primary font-semibold uppercase transition-all md:static md:flex-row md:bg-transparent ${
                navbar ? "left-0" : "left-[100vw] md:flex"
              }`}
            >
              <button
                type="button"
                className={`absolute right-4 top-2 rounded-md p-2 focus:bg-secondary md:hidden ${
                  navbar ? "flex" : "hidden"
                }`}
                onClick={() => {
                  setNavbar(false);
                }}
              >
                <RiCloseFill className="h-[37px] w-[37px]" />
              </button>
              <ul className="h-screen items-center justify-center md:flex md:h-auto ">
                <li
                  className="nav-button cursor-pointer py-4 text-center hover:bg-secondary md:px-4"
                  onClick={() => {
                    setNavbar(!navbar);
                    router.push("/news");
                  }}
                >
                  <Link
                    href="/news"
                    className="inline-block min-h-[37px]"
                    onClick={() => setNavbar(!navbar)}
                  >
                    <p className="pt-2">News</p>
                  </Link>
                </li>
                <li
                  className="nav-button cursor-pointer py-4 text-center hover:bg-secondary md:px-4"
                  onClick={() => {
                    setNavbar(!navbar);
                    router.push("/games");
                  }}
                >
                  <Link
                    href="/games"
                    className="inline-block min-h-[37px]"
                    onClick={() => setNavbar(!navbar)}
                  >
                    <p className="pt-2">Games</p>
                  </Link>
                </li>
                <li
                  className="nav-button cursor-pointer py-4 text-center hover:bg-secondary md:px-4"
                  onClick={() => {
                    setNavbar(!navbar);
                    router.push("/team");
                  }}
                >
                  <Link
                    href="/team"
                    className="inline-block min-h-[37px]"
                    onClick={() => setNavbar(!navbar)}
                  >
                    <p className="pt-2">Meet the Team</p>
                  </Link>
                </li>
                <li
                  className="nav-button cursor-pointer py-4 text-center hover:bg-secondary md:px-4"
                  onClick={() => setNavbar(!navbar)}
                >
                  <Link
                    href="https://www.patreon.com/oraculargames"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block min-h-[37px]"
                    onClick={() => setNavbar(!navbar)}
                  >
                    <p className="pt-2">Support Us</p>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          {/* Sign up/Log in */}
          <div className="flex content-center items-center justify-center">
            <button
              type="button"
              className="m-3 rounded px-4 py-2 transition-all hover:bg-secondary"
              onClick={() => {
                router.push("/login");
              }}
            >
              Log In
            </button>
            <button
              type="button"
              className="m-3 rounded bg-rad px-3 py-2 transition-all hover:bg-darkRad"
              onClick={() => {
                router.push("/signup");
              }}
            >
              Sign Up
            </button>
            {/* Hamburger for mobile */}
            <div className="md:hidden">
              <button
                type="button"
                className="rounded-md p-2 focus:bg-secondary"
                onClick={() => {
                  setNavbar(true);
                }}
              >
                <RiMenu3Fill className="h-[37px] w-[37px]" />
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div className="mt-[69px] h-screen w-screen">{children}</div>
    </div>
  );
};

export default Layout;
