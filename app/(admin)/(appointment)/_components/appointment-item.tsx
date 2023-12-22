"use client";

import { IAppointment, IEmployeeWithAppointments } from "@/types/types";
import { format } from "date-fns";
import React from "react";
import { useAppointmentModal } from "@/hooks/useAppointmentModal";

type Props = {
  appointment: IAppointment;
  employees?: IEmployeeWithAppointments[];
};

const AppointmentItem = ({ appointment, employees }: Props) => {
  const onOpen = useAppointmentModal((state) => state.onOpen);
  const availableEmployees = employees?.filter((emp) => {
    const empAppointmentsDate = emp.employeeAppointments?.map((app) =>
      app.date.getTime()
    );
    const appTime = appointment.date.getTime();

    return !empAppointmentsDate?.includes(appTime);
  });

  return (
    <div
      className="ring-1 py-2 px-3 rounded-lg flex flex-col gap-2 cursor-pointer hover:scale-[1.02] transition"
      onClick={() => onOpen(appointment, availableEmployees)}
    >
      <p>
        {format(appointment.date, "PPP")} at {format(appointment.date, "kk:mm")}
      </p>
      <p> User : {appointment.user?.name}</p>
      <p>
        {" "}
        Employee :{" "}
        {appointment.employee?.name || appointment.employeeId || (
          <span className="italic text-sm">Not assigned</span>
        )}
      </p>
    </div>
  );
};

export default AppointmentItem;
