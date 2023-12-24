import Link from "next/link";
import { format } from "date-fns";

import { Prisma } from "@prisma/client";

import { IAppointment } from "@/types/types";

import { auth } from "@/config/auth";

import { getAppointments } from "@/lib/get-appointments";

import { Button } from "@/components/ui/button";

const MyAppointmentsPage = async () => {
  const session = await auth();

  const userId = session!.user.id;

  const query: Prisma.AppointmentFindManyArgs = {
    where: {
      ...(session?.user.role === "USER"
        ? { userId: userId }
        : { employeeId: userId }),
    },
  };

  const appointments = (await getAppointments(query)) as
    | IAppointment[]
    | undefined;

  return (
    <div className="w-full min-h-screen relative flex flex-col items-center pt-28 space-y-10">
      <Button asChild size={"lg"} variant={"primary"}>
        <Link href={"/make-appointment"}>Make a new Appointment</Link>
      </Button>
      <h2 className="text-center text-lg md:text-2xl font-semibold text-neutral-700 dark:text-white">
        Your appointments
      </h2>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 px-10 gap-5">
        {appointments?.map((app) => (
          <div
            className="bg-gray-200 dark:bg-gray-700 py-2 rounded-lg
            flex flex-col gap-2 items-center justify-center px-4 text-sm text-center
            "
            key={app.id}
          >
            {format(app.date, "PPP")} at {format(app.date, "kk:mm")}
            {app?.isApproved ? (
              <span className="italic text-green-500 text-sm">Approved</span>
            ) : (
              <span className="italic text-rose-500 text-sm">
                Not approved Yet
              </span>
            )}
          </div>
        ))}
      </div>
      {!appointments && (
        <h2 className="text-center text-lg md:text-2xl font-semibold text-neutral-700 dark:text-white">
          You dont have any appointments
        </h2>
      )}
    </div>
  );
};

export default MyAppointmentsPage;
