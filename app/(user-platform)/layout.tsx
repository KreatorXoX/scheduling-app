import { redirect } from "next/navigation";

import { auth } from "@/config/auth";

import { UserNavbar } from "./_components/navbar";

export async function generateMetadata() {
  const session = await auth();

  return {
    title: `${session?.user.name}`,
    description: "You can check your appointments here",
  };
}

type Props = { children: React.ReactNode };

const HomeLayout = async ({ children }: Props) => {
  const session = await auth();

  if (!session?.user) {
    redirect("/api/auth/signin?callbackUrl=/");
  }
  return (
    <div className="min-h-screen relative">
      <UserNavbar
        userImage={session.user.image}
        username={session.user.name}
        role={session.user.role}
      />
      {children}
    </div>
  );
};

export default HomeLayout;
