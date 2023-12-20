import { redirect } from "next/navigation";

import { auth } from "@/config/auth";

import { AdminNavbar } from "./_components/navbar";
import ModalProvider from "@/providers/modal-provider";

type Props = {
  children: React.ReactNode;
};

const AdminLayout = async ({ children }: Props) => {
  const session = await auth();

  if (session?.user.role !== "admin") {
    redirect("/api/auth/signin");
  }
  return (
    <>
      <ModalProvider />
      <div className="min-h-screen">
        <AdminNavbar
          userImage={session?.user.image}
          username={session?.user.name}
        />
        <main className="flex justify-center items-start h-full w-full">
          {children}
        </main>
      </div>
    </>
  );
};

export default AdminLayout;
