"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = { src?: string | null };

const UserAvatar = ({ src }: Props) => {
  return (
    <Avatar>
      <AvatarImage src={src ? src : undefined} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
