"use client";

import Image from "next/image";
import { useState } from "react";

import logoPng from "~/logo-transparent.png";
import logoPngBandW from "~/logo-transparent-b&w.png";

const Logo = () => {
  const [isHover, setIsHover] = useState<boolean>(false);

  return (
    <div
      className="hover:cursor-pointer"
      onMouseEnter={() => {
        setIsHover(true);
      }}
      onMouseLeave={() => {
        setIsHover(false);
      }}
    >
      <Image
        alt="logo"
        src={isHover ? logoPng : logoPngBandW}
        height={65}
        width={65}
      />
    </div>
  );
};

export default Logo;
