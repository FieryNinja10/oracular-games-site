import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import { Layout } from "@/components";
import { buttonVariants } from "@/components/ui/button";

const PageNotFound = () => {
  return (
    <Layout
      isNav={false}
      className="flex h-screen flex-col items-center justify-center bg-gradient-to-tl from-prime via-prime to-black text-center font-rubik text-xl text-white"
    >
      <div>
        404 Page not found
        <Separator className="my-2" />
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
