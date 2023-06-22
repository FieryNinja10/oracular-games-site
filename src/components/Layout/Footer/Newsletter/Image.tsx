import Image from "next/image";
import newsletter from "~/newsletter.svg";

const NewsletterImage = () => {
  return (
    <div className="relative hidden h-full max-w-[55%] flex-1 items-center justify-center rounded-r-[14px] bg-gradient-to-l from-[#DC4A65] to-[#FD9898] clip-path-polygon-[20%_0%,_100%_0,_100%_100%,_0%_100%] lg:flex">
      <div className="h-full w-auto p-8">
        <Image
          alt="newsletter image"
          src={newsletter}
          className="h-full w-auto"
        />
      </div>
    </div>
  );
};

export default NewsletterImage;
