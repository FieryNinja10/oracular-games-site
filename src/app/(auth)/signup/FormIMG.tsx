import Image from "next/image";
import welcome from "~/welcome.svg";

const FormIMG = () => {
  return (
    <div className="hidden h-full min-h-screen w-[50vw] items-center justify-center bg-prime py-12 lg:flex">
      <Image
        src={welcome}
        alt="sign up image"
        className="h-[35rem] w-auto self-center px-8 py-12"
        priority
      />
    </div>
  );
};

export default FormIMG;
