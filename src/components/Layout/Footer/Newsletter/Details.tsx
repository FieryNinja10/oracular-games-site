"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Details = () => {
  return (
    <div className="flex h-full flex-[1] flex-col items-center justify-center pb-14 pt-6 text-center font-rubik text-white sm:pb-6">
      <div className="flex max-w-[80%] flex-col">
        <h3 className="text-2xl font-bold">Subscribe to our Newsletter</h3>
        <p className="my-3 text-lg">
          Get notified on all the latest updates and more!
        </p>
      </div>
      <form className="relative flex h-10 w-full flex-col px-6 sm:flex-row">
        <Input
          type="email"
          placeholder="example@email.com"
          className="mb-2 h-[35px] rounded-2xl border-none bg-white pl-[1.5em] text-base text-black outline-none"
        />
        <Button className="static right-[24px] top-0 h-[35px] w-full rounded-2xl bg-rad text-base text-white transition-all hover:bg-darkRad sm:absolute sm:w-auto sm:rounded-tl-none">
          Subscribe
        </Button>
      </form>
    </div>
  );
};

export default Details;