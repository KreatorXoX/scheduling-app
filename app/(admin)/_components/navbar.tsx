"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

import UserSetting from "@/app/(user-platform)/_components/user-setting";
import MobileSidebar from "./mobile-navbar";
import { cn } from "@/lib/utils";

type Props = { userImage?: string | null; username?: string | null };

export const AdminNavbar = ({ userImage, username }: Props) => {
  const currentPath = usePathname();

  return (
    <nav className="w-full max-w-7xl  mx-auto fixed top-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-10 px-5">
      <MobileSidebar userImage={userImage} username={username} />
      <div className="items-center justify-evenly hidden md:flex">
        <Button
          size={"sm"}
          variant={"link"}
          asChild
          className="w-full justify-center"
        >
          <Link
            href={"/employee-create"}
            className={cn(
              currentPath === "/employee-create"
                ? "underline bg-black/10 dark:bg-slate-700 dark:text-white"
                : ""
            )}
          >
            Create Employee
          </Link>
        </Button>
        <Button
          size={"sm"}
          variant={"link"}
          asChild
          className="w-full justify-center"
        >
          <Link
            href={"/employee-list"}
            className={cn(
              currentPath === "/employee-list"
                ? "underline bg-black/10 dark:bg-slate-700 dark:text-white"
                : ""
            )}
          >
            Employee List
          </Link>
        </Button>
        <Button
          size={"sm"}
          variant={"link"}
          asChild
          className="w-full justify-center"
        >
          <Link
            href={"/appointment-list"}
            className={cn(
              currentPath === "/appointment-list"
                ? "underline bg-black/10 dark:bg-slate-700 dark:text-white"
                : ""
            )}
          >
            Appointment List
          </Link>
        </Button>

        <div className="flex items-center gap-4">
          <UserSetting userImage={userImage} />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};
