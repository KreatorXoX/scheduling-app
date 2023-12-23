import { Prisma, Role } from "@prisma/client";

import { IAppointment, IEmployeeAppointment } from "@/types/types";

import { auth } from "@/config/auth";

import { getUsers } from "@/lib/get-users";
import { getAppointments } from "@/lib/get-appointments";
import { intersectionOfUnavailableDates } from "@/lib/utils";

import DateTimePicker from "@/components/date-hour-picker";

const MakeAppointmentPage = async () => {
  const session = await auth();

  if (!session?.user.id) return null;

  const employeesQuery: Prisma.UserFindManyArgs = {
    where: {
      role: Role.EMPLOYEE,
    },
    select: {
      employeeAppointments: {
        select: {
          date: true,
        },
      },
    },
  };

  const usersQuery: Prisma.AppointmentFindManyArgs = {
    where: {
      userId: session?.user?.id,
    },
  };

  const employeesAppointmentPromise = getUsers(employeesQuery) as Promise<
    IEmployeeAppointment[] | undefined
  >;

  const userAppointmentsPromise = getAppointments(usersQuery) as Promise<
    IAppointment[]
  >;

  const [appointmentsByAllEmployees, appointmentsByUser] = await Promise.all([
    employeesAppointmentPromise,
    userAppointmentsPromise,
  ]);

  const x = appointmentsByAllEmployees;
  const unavailableDatesForUser =
    appointmentsByUser?.map((data) => data.date) || [];

  const unavailableDatesForEmployees = x?.map((data) =>
    data.employeeAppointments?.map((data) => data.date)
  );

  const disabledDates = intersectionOfUnavailableDates(
    ...(unavailableDatesForEmployees as Date[][])
  );

  return (
    <div className="w-full min-h-screen relative pt-28">
      <h2 className="text-center text-lg md:text-2xl font-semibold text-neutral-700 dark:text-white">
        Pick a date and hour to make your appointment
      </h2>
      <DateTimePicker
        disabledDates={[...disabledDates, ...unavailableDatesForUser]}
      />
    </div>
  );
};

export default MakeAppointmentPage;
