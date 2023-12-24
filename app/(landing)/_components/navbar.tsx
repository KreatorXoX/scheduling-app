"use client";

import { useRouter } from "next/navigation";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

type Props = {};

export const Navbar = (props: Props) => {
  const router = useRouter();
  return (
    <nav className="w-full flex items-center justify-evenly max-w-7xl mx-auto fixed top-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-10 px-5">
      <div className="ml-10 hidden md:block">Logo</div>
      <div className="w-full flex md:justify-end justify-between items-center gap-5 px-10 ">
        <Button
          size={"sm"}
          variant={"default"}
          onClick={() => router.push("/api/auth/signin")}
        >
          Login
        </Button>

        <ThemeToggle />
      </div>
    </nav>
  );
};
