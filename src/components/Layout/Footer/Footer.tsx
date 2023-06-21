import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import Newsletter from "./Newsletter/Newsletter";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="bg-second text-white/50 font-rubik flex flex-col px-[8em]">
      <div className="flex font-bold py-3 justify-between">
        <Link href="/">
          <Logo />
        </Link>
        <div>something else</div>
        <Newsletter />
      </div>
      <Separator className="bg-white/50" />
      <div className="font-nunito flex justify-between py-3">
        <span>
          © Copyright {new Date().getFullYear()} Oracular Games, Inc. All Rights
          Reserved.
        </span>
        <div className="flex gap-3">
          <Link
            href="/terms"
            className="hover:text-white/90 transition-all hover:underline"
          >
            Terms of Service
          </Link>
          <Separator orientation="vertical" className="bg-white/50" />
          <Link
            href="/privacy"
            className="hover:text-white/90 transition-all hover:underline"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
