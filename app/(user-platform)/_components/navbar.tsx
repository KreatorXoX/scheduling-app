"use client";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { signOutUser } from "@/actions/auth";
type Props = {};

export const UserNavbar = (props: Props) => {
  const currentPath = usePathname();
  return (
    <nav className="w-full flex items-center justify-evenly max-w-7xl mx-auto fixed top-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-10">
      <Button size={"sm"} variant={"link"} asChild>
        <Link
          href={"/my-appointments"}
          className={cn(
            currentPath === "/my-appointments" ? "bg-sky-500  text-white" : ""
          )}
        >
          My Appointment
        </Link>
      </Button>
      <Button size={"sm"} variant={"link"} asChild>
        <Link
          href={"/make-appointment"}
          className={cn(
            currentPath === "/make-appointment" ? "bg-sky-500 text-white" : ""
          )}
        >
          Make Appointment
        </Link>
      </Button>
      <div className="flex items-center gap-4">
        <Button
          size={"sm"}
          variant={"destructive"}
          onClick={() => signOutUser()}
        >
          <p>Logout</p>
        </Button>

        <ThemeToggle />
      </div>
    </nav>
  );
};
