import { auth } from "@/config/auth";
import { db } from "@/lib/db";
import AppointmentItem from "../_components/appointment-item";
import AdminWrapper from "../../_components/admin-wrapper";
import { Role } from "@prisma/client";
export default async function WaitingAppointments() {
  const session = await auth();
  const appointmentsPromise = db.appointment.findMany({
    where: {
      isApproved: false,
    },
    include: {
      user: true,
    },
  });
  const employeesPromise = db.user.findMany({
    where: {
      role: Role.EMPLOYEE,
    },
    include: {
      employeeAppointments: true,
    },
  });

  const [appointments, employees] = await Promise.all([
    appointmentsPromise,
    employeesPromise,
  ]);
  let content;
  if (appointments.length > 0) {
    content = (
      <AdminWrapper>
        {appointments.map((appointment) => (
          <AppointmentItem
            key={appointment.id}
            appointment={appointment}
            employees={employees}
          />
        ))}
      </AdminWrapper>
    );
  } else {
    content = (
      <div className="relative w-full h-[calc(100vh-20rem)]">
        <h1 className="text-2xl text-center mt-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          No Waiting appointments
        </h1>
      </div>
    );
  }
  return content;
}
