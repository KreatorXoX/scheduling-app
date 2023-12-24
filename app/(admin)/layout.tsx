import { redirect } from "next/navigation";

import { Role } from "@prisma/client";

import { auth } from "@/config/auth";

import ModalProvider from "@/providers/modal-provider";

import { AdminNavbar } from "./_components/navbar";

export async function generateMetadata() {
  const session = await auth();

  if (session?.user.role !== Role.ADMIN) {
    return {
      title: "User Platform",
      description: "You can make appointments and view your appointments",
    };
  }

  return {
    title: "Admin Platform",
    description: "You can assign roles to users and manage appointments",
  };
}

type Props = {
  children: React.ReactNode;
};

const AdminLayout = async ({ children }: Props) => {
  const session = await auth();

  if (session?.user.role !== Role.ADMIN) {
    redirect("/api/auth/signin");
  }
  return (
    <div className="h-full">
      <AdminNavbar
        userImage={session?.user.image}
        username={session?.user.name}
      />
      <main className="flex justify-center items-start h-full w-full">
        <ModalProvider />
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
