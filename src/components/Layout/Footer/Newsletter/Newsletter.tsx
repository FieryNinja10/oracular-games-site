import NewsletterImage from "./Image";
import Details from "./Details";

const Newsletter = () => {
  return (
    <div className="relative my-6 flex h-[16em] w-full rounded-2xl border-2 border-white bg-white/20 backdrop-blur-md">
      <Details />
      <NewsletterImage />
    </div>
  );
};

export default Newsletter;
