"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useCreateUserModal } from "@/hooks/useCreateUser";

import { cn } from "@/lib/utils";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

import UserSetting from "@/app/(user-platform)/_components/user-setting";

import MobileSidebar from "./mobile-navbar";

type Props = { userImage?: string | null; username?: string | null };

export const AdminNavbar = ({ userImage, username }: Props) => {
  const openCreateUserModal = useCreateUserModal((state) => state.onOpen);

  const currentPath = usePathname();
  return (
    <nav className="w-full max-w-7xl  mx-auto fixed top-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-10 px-5">
      <MobileSidebar userImage={userImage} username={username} />
      <div className="w-full items-center justify-between gap-2 hidden md:flex">
        <Button
          onClick={openCreateUserModal}
          size={"sm"}
          variant={"link"}
          className=" justify-center"
        >
          Create Employee
        </Button>
        <Button
          size={"sm"}
          variant={"link"}
          asChild
          className=" justify-center"
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
          className=" justify-center"
        >
          <Link
            href={"/waiting-appointments"}
            className={cn(
              currentPath === "/waiting-appointments"
                ? "underline bg-black/10 dark:bg-slate-700 dark:text-white"
                : ""
            )}
          >
            Waiting Appointments
          </Link>
        </Button>
        <Button
          size={"sm"}
          variant={"link"}
          asChild
          className=" justify-center"
        >
          <Link
            href={"/approved-appointments"}
            className={cn(
              currentPath === "/approved-appointments"
                ? "underline bg-black/10 dark:bg-slate-700 dark:text-white"
                : ""
            )}
          >
            Approved Appointments
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
