import { auth } from "@/config/auth";

export default async function CreateEmployeePage() {
  const session = await auth();

  return (
    <main className="min-h-screen flex flex-col items-center justify-start pt-28 ">
      CreateEmployeePage
    </main>
  );
}
