"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = { src?: string | null; name?: string | null };

const EmployeeAvatar = ({ src, name }: Props) => {
  return (
    <Avatar className="w-20 h-20 ">
      <AvatarImage src={src ? src : undefined} />
      <AvatarFallback className="text-sm ">
        {name ? name.split(" ")[0] : "Emp"}
      </AvatarFallback>
    </Avatar>
  );
};

export default EmployeeAvatar;
