import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import Newsletter from "./Newsletter/Newsletter";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="flex flex-col bg-second px-[2em] font-rubik text-white/50">
      <div className="flex justify-between py-3 font-bold">
        <Link href="/">
          <Logo />
        </Link>
        <div>something else</div>
      </div>
      <Newsletter />
      <Separator className="bg-white/50" />
      <div className="flex justify-between py-3 font-nunito">
        <span>
          © Copyright {new Date().getFullYear()} Oracular Games, Inc. All Rights
          Reserved.
        </span>
        <div className="flex gap-3">
          <Link
            href="/terms"
            className="transition-all hover:text-white/90 hover:underline"
          >
            Terms of Service
          </Link>
          <Separator orientation="vertical" className="bg-white/50" />
          <Link
            href="/privacy"
            className="transition-all hover:text-white/90 hover:underline"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
