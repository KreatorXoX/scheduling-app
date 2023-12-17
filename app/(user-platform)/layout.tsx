import { redirect } from "next/navigation";

import { auth } from "@/config/auth";

import { UserNavbar } from "./_components/navbar";

type Props = { children: React.ReactNode };

const HomeLayout = async ({ children }: Props) => {
  const session = await auth();

  if (!session?.user) {
    redirect("/api/auth/signin?callbackUrl=/my-appointments");
  }
  return (
    <div className="min-h-screen relative">
      <UserNavbar userImage={session.user.image} username={session.user.name} />
      {children}
    </div>
  );
};

export default HomeLayout;
