import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href={"/"}>
      <div
        className={
          "flex items-center justify-center gap-2 hover:opacity-60 transition invisible md:visible"
        }
      >
        <div className="h-8 w-8 relative">
          <Image src={"/logo.svg"} fill alt="logo" sizes="20vw" />
        </div>
        <span className="text-lg ">Appointy</span>
      </div>
    </Link>
  );
};

export default Logo;
