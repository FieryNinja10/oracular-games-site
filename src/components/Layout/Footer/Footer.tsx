"use client";

import Link from "next/link";
import { useState } from "react";

import { Separator } from "@/components/ui/separator";
import Newsletter from "./Newsletter/Newsletter";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="flex w-full flex-col bg-second px-[2em] font-rubik text-white/50">
      <div className="flex flex-col items-center justify-between py-3 font-bold md:flex-row">
        <Link href="/" className="p-0 md:pr-12">
          <Logo />
        </Link>
        <div className="my-8 h-max w-full text-center text-sm uppercase">
          <Link
            href="/security"
            className="block px-4 py-1 transition-all hover:text-white/90 hover:underline sm:inline-block"
          >
            Security
          </Link>
          <Link
            href="/team"
            className="block px-4 py-1 transition-all hover:text-white/90 hover:underline sm:inline-block"
          >
            Meet the Team
          </Link>
          <Link
            href="/terms"
            className="block px-4 py-1 transition-all hover:text-white/90 hover:underline sm:inline-block"
          >
            Terms of Service
          </Link>
          <Link
            href="/privacy"
            className="block px-4 py-1 transition-all hover:text-white/90 hover:underline sm:inline-block"
          >
            Privacy Policy
          </Link>
          <Link
            href="/support/game"
            className="block px-4 py-1 transition-all hover:text-white/90 hover:underline sm:inline-block"
          >
            Player Support
          </Link>
          <Link
            href="/support/security"
            className="block px-4 py-1 transition-all hover:text-white/90 hover:underline sm:inline-block"
          >
            Security/Privacy Support
          </Link>
          <Link
            href="/accessibility"
            className="block px-4 py-1 transition-all hover:text-white/90 hover:underline sm:inline-block"
          >
            Accessibility
          </Link>
        </div>
        <div className="flex gap-3 p-0 md:pl-12">
          <a href="" target="_blank" className="group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 127.14 96.36"
              height={20}
              width={20}
            >
              <defs></defs>
              <g id="图层_2" data-name="图层 2">
                <g id="Discord_Logos" data-name="Discord Logos">
                  <g
                    id="Discord_Logo_-_Large_-_White"
                    data-name="Discord Logo - Large - White"
                  >
                    <path
                      className="fill-white/50 group-hover:fill-rad"
                      d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"
                    />
                  </g>
                </g>
              </g>
            </svg>
          </a>
          <a href="" target="_blank" className="group">
            <svg viewBox="0 0 19 13" height={20} width={20}>
              <path
                className="fill-white/50 group-hover:fill-rad"
                d="M18.6 2.8s-.2-1.3-.7-1.8C17.2.3 16.4.3 16 .2 13.4 0 9.5 0 9.5 0S5.6 0 3 .2c-.4 0-1.1 0-1.9.8-.5.5-.7 1.8-.7 1.8s-.2 1.5-.2 3v1.4c0 1.5.2 3 .2 3s.2 1.3.7 1.8c.7.7 1.6.7 2 .8 1.6.2 6.4.2 6.4.2s3.9 0 6.5-.2c.4 0 1.1 0 1.9-.8.6-.6.7-1.8.7-1.8s.2-1.5.2-3V5.8l-.2-3zm-11 6.1V3.7l5 2.6-5 2.6z"
              ></path>
            </svg>
          </a>
        </div>
      </div>
      <Newsletter />
      <Separator className="bg-white/50" />
      <div className="flex justify-between py-3 font-nunito text-sm">
        <span>
          © Copyright {new Date().getFullYear()} Oracular Games, Inc. All
          Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
