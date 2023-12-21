import { auth } from "@/config/auth";
import AdminWrapper from "../../_components/admin-wrapper";
import { db } from "@/lib/db";
import AppointmentItem from "../_components/appointment-item";

export default async function ApprovedAppointments() {
  const session = await auth();
  const appointments = await db.appointment.findMany({
    where: {
      isApproved: true,
    },
    include: {
      user: true,
      employee: true,
    },
  });
  let content;
  if (appointments.length > 0) {
    content = (
      <AdminWrapper>
        {appointments.map((appointment) => (
          <AppointmentItem key={appointment.id} appointment={appointment} />
        ))}
      </AdminWrapper>
    );
  } else {
    content = (
      <div className="relative w-full h-[calc(100vh-20rem)]">
        <h1 className="text-2xl text-center mt-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          No Approved appointments
        </h1>
      </div>
    );
  }
  return content;
}
