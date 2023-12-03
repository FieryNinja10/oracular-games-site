import Link from "next/link";
import Image from "next/image";

import { Separator } from "@/components/ui/separator";
import { Layout } from "@/components";
import { buttonVariants } from "@/components/ui/button";
import pageNotFound from "~/404.svg";

const PageNotFound = () => {
  return (
    <Layout
      isNav={false}
      className="flex h-screen flex-col items-center justify-center bg-gradient-to-tl from-prime via-prime to-black text-center font-rubik text-xl text-white"
    >
      <Image
        src={pageNotFound}
        alt="404 image"
        className="h-[25rem] w-auto self-center px-8 py-12"
      />
      <div>
        <Link
          href="/"
          className={buttonVariants({
            variant: "default",
            className: "bg-transparent uppercase hover:bg-second"
          })}
        >
          Go home
        </Link>
      </div>
    </Layout>
  );
};

export default PageNotFound;
