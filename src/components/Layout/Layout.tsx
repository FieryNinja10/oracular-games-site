import Image from "next/image";
import Link from "next/link";
import useRouter from "next/router";
import { useState } from "react";
import { RiMenu3Fill, RiCloseFill } from "react-icons/ri";
import { logo } from "@/assets";
import { AuthForm, AuthModal } from "..";

export interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [navbar, setNavbar] = useState(false);
  const router = useRouter;

  return (
    <div className="flex h-full w-full flex-col">
      <nav className="flex justify-between w-full bg-primary fixed top-0 left-0 right-0 z-10 font-rubik text-white">
        <div className="flex justify-between px-4 w-full">
          <div className="flex">
            {/* LOGO */}
            <div
              className="py-4 md:px-4 hover:bg-secondary cursor-pointer"
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
              className={`font-semibold uppercase absolute md:static transition-all bg-primary md:bg-transparent right-0 left-0 top-0 flex-col md:flex-row ${
                navbar ? "left-0" : "left-[100vw] md:flex"
              }`}
            >
              <button
                type="button"
                className={`p-2 rounded-md md:hidden top-2 right-4 absolute focus:bg-secondary ${
                  navbar ? "flex" : "hidden"
                }`}
                onClick={() => {
                  setNavbar(!navbar);
                }}
              >
                <RiCloseFill className="h-[37px] w-[37px]" />
              </button>
              <ul className="h-screen md:h-auto items-center justify-center md:flex ">
                <li
                  className="nav-button py-4 md:px-4 text-center hover:bg-secondary cursor-pointer"
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
                  className="nav-button py-4 md:px-4 text-center hover:bg-secondary cursor-pointer"
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
                  className="nav-button py-4 md:px-4 text-center hover:bg-secondary cursor-pointer"
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
                  className="nav-button py-4 md:px-4 text-center hover:bg-secondary cursor-pointer"
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
          <div className="flex justify-center items-center content-center">
            <button
              type="button"
              className="m-3 rounded px-4 py-2 transition-all hover:bg-secondary"
              onClick={() => {}}
            >
              Log In
            </button>
            <button
              type="button"
              className="m-3 rounded bg-rad px-3 py-2 transition-all hover:bg-darkRad"
              onClick={() => {}}
            >
              Sign Up
            </button>
            {/* Hamburger for mobile */}
            <div className="md:hidden">
              <button
                type="button"
                className="p-2 rounded-md focus:bg-secondary"
                onClick={() => {
                  setNavbar(!navbar);
                }}
              >
                <RiMenu3Fill className="h-[37px] w-[37px]" />
              </button>
            </div>
          </div>
        </div>
      </nav>
      <AuthModal isOpen={false} closeModal={{}} title="">
        <AuthForm />
      </AuthModal>
      {children}
    </div>
  );
};

export default Layout;
