import { auth } from "@/config/auth";
import { db } from "@/lib/db";
import { format } from "date-fns";

export default async function WaitingAppointments() {
  const session = await auth();
  const appointments = await db.appointment.findMany({
    where: {
      isApproved: false,
    },
  });

  return (
    <main className="min-h-screen flex flex-col items-center justify-start pt-28 ">
      {appointments.map((appointment) => (
        <div key={appointment.id}>
          {format(appointment.date, "PPP")} at{" "}
          {format(appointment.date, "kk:mm")}
        </div>
      ))}
    </main>
  );
}
