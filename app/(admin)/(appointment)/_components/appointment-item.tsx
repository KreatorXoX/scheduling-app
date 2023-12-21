"use client";

import { IAppointment } from "@/types/types";
import { format } from "date-fns";
import React from "react";
import { useAppointmentModal } from "@/hooks/useAppointmentModal";

type Props = { appointment: IAppointment };

const AppointmentItem = ({ appointment }: Props) => {
  const onOpen = useAppointmentModal((state) => state.onOpen);
  return (
    <div
      className="ring-1 py-2 px-3 rounded-lg flex flex-col gap-2 cursor-pointer hover:scale-[1.02] transition"
      onClick={() => onOpen(appointment)}
    >
      <p>
        {format(appointment.date, "PPP")} at {format(appointment.date, "kk:mm")}
      </p>
      <p> User : {appointment.user?.name}</p>
      <p>
        {" "}
        Employee :{" "}
        {appointment.employeeId || (
          <span className="italic text-sm">Not assigned</span>
        )}
      </p>
    </div>
  );
};

export default AppointmentItem;
