import { auth } from "@/config/auth";

import { getAppointmentsByAllEmployees } from "@/lib/get-appointments-by-all-employees";
import { getAppointmentsByUser } from "@/lib/get-appointments-by-user";
import { intersectionOfUnavailableDates } from "@/lib/utils";

import DateTimePicker from "@/components/date-hour-picker";

const MakeAppointmentPage = async () => {
  const session = await auth();
  const employeesAppointmentPromise = getAppointmentsByAllEmployees();
  const userAppointmentsPromise = getAppointmentsByUser(session!.user.id);

  const [appointmentsByAllEmployees, appointmentsByUser] = await Promise.all([
    employeesAppointmentPromise,
    userAppointmentsPromise,
  ]);

  const unavailableDatesForUser =
    appointmentsByUser?.map((data) => data.date) || [];

  const unavailableDatesForEmployees = appointmentsByAllEmployees?.map((data) =>
    data.employeeAppointments.map((data) => data.date)
  );

  const disabledDates = intersectionOfUnavailableDates(
    ...(unavailableDatesForEmployees || [])
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
