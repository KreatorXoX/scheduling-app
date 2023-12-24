import { Role, Prisma } from "@prisma/client";

import { IAppointment, IEmployeeWithAppointments } from "@/types/types";

import { getUsers } from "@/lib/get-users";
import { getAppointments } from "@/lib/get-appointments";

import AppointmentItem from "../_components/appointment-item";
import AdminWrapper from "../../_components/admin-wrapper";

export default async function WaitingAppointments() {
  const employeesQuery: Prisma.UserFindManyArgs = {
    where: {
      role: Role.EMPLOYEE,
    },
    include: {
      employeeAppointments: true,
    },
  };

  const appointmentsQuery: Prisma.AppointmentFindManyArgs = {
    where: {
      isApproved: false,
    },
    include: {
      user: true,
    },
  };
  const appointmentsPromise = getAppointments(appointmentsQuery) as Promise<
    IAppointment[] | undefined
  >;
  const employeesPromise = getUsers(employeesQuery) as Promise<
    IEmployeeWithAppointments[] | undefined
  >;

  const [appointments, employees] = await Promise.all([
    appointmentsPromise,
    employeesPromise,
  ]);
  let content;
  if (appointments && appointments.length > 0) {
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
