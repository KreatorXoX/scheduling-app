"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { signOutUser } from "@/actions/auth";

import { useMobileSidebar } from "@/hooks/useMobileSidebar";

import { cn } from "@/lib/utils";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import UserAvatar from "@/app/(user-platform)/_components/user-avatar";
import { useCreateUserModal } from "@/hooks/useCreateUser";

type Props = { userImage?: string | null; username?: string | null };

const MobileSidebar = ({ userImage, username }: Props) => {
  const { onOpen, onClose, isOpen } = useMobileSidebar();
  const openCreateUserModal = useCreateUserModal((state) => state.onOpen);
  const currentPath = usePathname();

  return (
    <>
      <Button
        onClick={onOpen}
        className="block md:hidden"
        size={"sm"}
        variant={"ghost"}
      >
        <Menu />
      </Button>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent
          side={"left"}
          className="pt-12 flex flex-col items-start gap-6"
        >
          <div className="flex items-center justify-between mb-10 w-full rounded-full">
            <div className="flex items-center gap-3">
              <UserAvatar src={userImage} />
              <p className="text-lg font-semibold text-neutral-700 dark:text-white">
                {username ? username : "Anonymous"}
              </p>
            </div>
            <ThemeToggle />
          </div>
          <Button
            onClick={openCreateUserModal}
            size={"sm"}
            variant={"link"}
            className="w-full justify-center"
          >
            Create Employee
          </Button>
          <Button
            size={"sm"}
            variant={"link"}
            asChild
            className="w-full justify-start"
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
            className="w-full justify-start"
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

          <Button
            size={"sm"}
            variant={"destructive"}
            onClick={() => signOutUser()}
            className="w-full"
          >
            <p>Logout</p>
          </Button>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileSidebar;
