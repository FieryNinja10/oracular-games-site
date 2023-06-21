import NewsletterImage from "./Image";
import Details from "./Details";

const Newsletter = () => {
  return (
    <div className="bg-white/20 backdrop-blur-md border-2 border-white rounded-lg flex relative w-full">
      <Details />
      <NewsletterImage />
    </div>
  );
};

export default Newsletter;
