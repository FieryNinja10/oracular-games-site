import React from "react";
import { cn } from "@/lib/utils";

import Navbar from "./Navbar";
import Footer from "./Footer/Footer";

const Layout = ({
  children,
  className,
  override = false,
  color,
  isNav = true,
  isFooter = true
}: {
  children: React.ReactNode;
  className?: string;
  override?: boolean;
  color?: string;
  isNav?: boolean;
  isFooter?: boolean;
}) => {
  const defaultClass = "w-screen min-h-screen";

  let classNames: string | undefined;
  if (override) {
    classNames = className + defaultClass;
  } else {
    classNames =
      className +
      " " +
      cn(defaultClass, {
        "mt-[theme(height.nav)] min-h-[calc(100vh-theme(height.nav)-theme(height.footer))]":
          isNav && isFooter,
        "mt-[theme(height.nav)] min-h-[calc(100vh-theme(height.nav))]":
          isNav && !isFooter,
        "min-h-[calc(100vh-theme(height.footer))]": !isNav && isFooter
      });
  }

  return (
    <div className="flex h-auto min-h-[100vh] max-w-full flex-col">
      <div id="top"></div>
      {isNav ? <Navbar color={color} /> : null}
      <div className={classNames}>{children}</div>
      {isFooter ? <Footer /> : null}
    </div>
  );
};

export default Layout;
