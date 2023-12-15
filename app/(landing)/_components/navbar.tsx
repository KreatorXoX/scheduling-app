import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

type Props = {};

export const Navbar = (props: Props) => {
  return (
    <nav className="w-full flex items-center max-w-7xl mx-auto fixed h-16">
      <div className="ml-10 hidden md:block">X</div>
      <div className="w-full flex md:justify-end justify-between items-center gap-5 px-10 ">
        <Button size={"sm"} variant={"outline"} asChild>
          <Link href={"/auth/sign-in"}>Login</Link>
        </Button>
        <Button size={"sm"} variant={"default"} asChild>
          <Link href={"/auth/sign-up"}>Sign up </Link>
        </Button>
        <ThemeToggle />
      </div>
    </nav>
  );
};
