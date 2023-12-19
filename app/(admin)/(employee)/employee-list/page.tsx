import { auth } from "@/config/auth";

export default async function EmployeeListPage() {
  const session = await auth();

  return (
    <main className="min-h-screen flex flex-col items-center justify-start pt-28 ">
      EmployeeListPage
    </main>
  );
}
