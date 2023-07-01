import Image from "next/image";
import loginIMG from "~/login.svg";

const FormIMG = () => {
  return (
    <div
      className={`hidden h-full w-[50vw] items-center justify-center bg-prime lg:flex`}
    >
      <Image
        src={loginIMG}
        alt="log in image"
        className="h-[35rem] w-auto self-center px-8 py-12"
      />
    </div>
  );
};

export default FormIMG;
