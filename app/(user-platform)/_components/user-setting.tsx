"use client";

import { CreditCard, LogOutIcon, Settings, User } from "lucide-react";

import { signOutUser } from "@/actions/auth";

import { useUserSetting } from "@/hooks/useUserSetting";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import UserAvatar from "./user-avatar";

type Props = { userImage?: string | null };

const UserSetting = ({ userImage }: Props) => {
  const { onClose, isOpen, onOpen } = useUserSetting();
  return (
    <DropdownMenu open={isOpen} onOpenChange={onClose}>
      <DropdownMenuTrigger onClick={onOpen}>
        <UserAvatar src={userImage} />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-40 hidden md:block"
        side="bottom"
        align="center"
      >
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => signOutUser()}>
            <LogOutIcon className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserSetting;
