import Image from "next/image";
import Link from "next/link";
import useRouter from "next/router";
import { useState, useEffect } from "react";
import { RiMenu3Fill, RiCloseFill } from "react-icons/ri";
import { logo } from "@/assets";
import { AuthForm, AuthModal } from "..";
import type { RootState } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { authFormActions } from "@/redux/reducers";

export interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  // Basic Navbar Functionality
  const [navbar, setNavbar] = useState(false);
  const router = useRouter;

  // Auth Form Reducer
  const dispatch = useDispatch();
  const { formType, isModalOpen } = useSelector((state: RootState) => {
    return state.authForm;
  });
  const { OPEN_AUTH_MODAL, CLOSE_AUTH_MODAL } = authFormActions;

  return (
    <div className="flex h-full w-full flex-col">
      <nav className="fixed left-0 right-0 top-0 z-10 flex w-full justify-between bg-primary font-rubik text-white">
        <div className="flex w-full justify-between px-4">
          <div className="flex">
            {/* LOGO */}
            <div
              className="cursor-pointer py-4 hover:bg-secondary md:px-4"
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
                dispatch(OPEN_AUTH_MODAL("login"));
              }}
            >
              Log In
            </button>
            <button
              type="button"
              className="m-3 rounded bg-rad px-3 py-2 transition-all hover:bg-darkRad"
              onClick={() => {
                dispatch(OPEN_AUTH_MODAL("signup"));
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
      <AuthModal
        isOpen={isModalOpen}
        closeModal={dispatch(CLOSE_AUTH_MODAL())}
        title={formType === "login" ? "Log In" : "Sign Up"}
      >
        <AuthForm />
      </AuthModal>
      {children}
    </div>
  );
};

export default Layout;
