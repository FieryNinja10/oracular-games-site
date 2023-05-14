import Image from "next/image";
import welcome from "~/welcome.svg";

const FormIMG = () => {
  return (
    <div className="hidden h-full w-[50vw] items-center justify-center bg-secondary lg:flex">
      <Image
        src={welcome}
        alt="sign up image"
        className="h-[35rem] w-auto self-center"
      />
    </div>
  );
};

export default FormIMG;
