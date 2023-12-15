import { auth } from "@/config/auth";

export default async function LandingPage() {
  const session = await auth();
  return (
    <main className="min-h-screen flex flex-col items-center justify-start py-20">
      <pre>{JSON.stringify(session, null, 4)}</pre>
    </main>
  );
}
