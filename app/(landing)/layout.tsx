import { redirect } from "next/navigation";

import { Role } from "@prisma/client";

import { auth } from "@/config/auth";

import { Navbar } from "./_components/navbar";

type Props = {
  children: React.ReactNode;
};

const LandingLayout = async ({ children }: Props) => {
  const session = await auth();

  if (session?.user) {
    if (session.user.role === Role.ADMIN) redirect("/employee-list");
    else redirect("/my-appointments");
  }
  return (
    <div className="min-h-screen ">
      <Navbar />
      <main className="flex justify-center items-start h-full w-full">
        {children}
      </main>
    </div>
  );
};

export default LandingLayout;
