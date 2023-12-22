import DateTimePicker from "@/components/date-hour-picker";
import { auth } from "@/config/auth";
import { db } from "@/lib/db";

type Props = {};

const MakeAppointmentPage = async (props: Props) => {
  const session = await auth();
  const unavailableEmployees = await db.user.findMany({
    where: { role: "employee" },
    select: {
      employeeAppointments: true,
    },
  });
  const userAppointments = await db.user.findUnique({
    where: { id: session?.user?.id },
    select: {
      appointments: true,
    },
  });

  const userUnavailableDates =
    userAppointments?.appointments.map((data) => data.date) || [];
  const unavailableDates = unavailableEmployees.map((data) =>
    data.employeeAppointments.map((data) => data.date)
  );
  const disabledDates = intersectionArrays(...unavailableDates);
  return (
    <div className="w-full min-h-screen relative pt-28">
      <h2 className="text-center text-lg md:text-2xl font-semibold text-neutral-700 dark:text-white">
        Pick a date and hour to make your appointment
      </h2>
      <DateTimePicker
        disabledDates={[...disabledDates, ...userUnavailableDates]}
      />
    </div>
  );
};

export default MakeAppointmentPage;

function intersectionArrays<Date>(...arrays: Date[][]) {
  if (arrays.length === 0) {
    return [];
  }

  const commonValues = arrays.reduce((accumulator, currentArray) => {
    return accumulator.filter((value) =>
      currentArray.some((date) => +date === +value)
    );
  }, arrays[0]);

  return commonValues;
}
