"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Role } from "@prisma/client";

import { cn } from "@/lib/utils";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

import MobileSidebar from "./mobile-navbar";
import UserSetting from "./user-setting";

type Props = {
  userImage?: string | null;
  username?: string | null;
  role?: Role;
};

export const UserNavbar = ({ userImage, username, role }: Props) => {
  const currentPath = usePathname();

  return (
    <nav className="w-full max-w-7xl  mx-auto fixed top-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-10 px-5">
      <MobileSidebar userImage={userImage} username={username} role={role} />
      <div className="items-center justify-evenly  hidden md:flex">
        <Button size={"sm"} variant={"link"} asChild>
          <Link
            href={"/my-appointments"}
            className={cn(
              currentPath === "/my-appointments"
                ? "underline underline-offset-4 decoration-violet-700 "
                : ""
            )}
          >
            My Appointments
          </Link>
        </Button>
        {role !== Role.EMPLOYEE ? (
          <Button size={"sm"} variant={"link"} asChild>
            <Link
              href={"/make-appointment"}
              className={cn(
                currentPath === "/make-appointment"
                  ? "underline underline-offset-4 decoration-violet-700 "
                  : ""
              )}
            >
              Make Appointment
            </Link>
          </Button>
        ) : null}
        <div className="flex items-center gap-4">
          <UserSetting userImage={userImage} />

          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};
