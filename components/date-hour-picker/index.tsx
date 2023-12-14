"use client";
import { add, format } from "date-fns";

import { cn } from "@/lib/utils";
import { useDateTime } from "@/hooks/useDateTime";
import { Calendar } from "@/components/ui/calendar";
import HourPicker from "./hour-picker";
import { Button } from "../ui/button";
import { useAppointments } from "@/hooks/useAppointments";

type Props = {};

const DatePicker = (props: Props) => {
  const setAppointment = useAppointments((state) => state.setAppointment);
  const appointments = useAppointments((state) => state.appointments);
  const setDate = useDateTime((state) => state.setDate);
  const setTime = useDateTime((state) => state.setTime);
  const time = useDateTime((state) => state.time);
  const date = useDateTime((state) => state.date);

  const getHours = (startHour: number, endHour: number) => {
    if (date) {
      const start = add(date, { hours: startHour });
      const end = add(date, { hours: endHour });
      const interval = 30;

      const times = [];

      for (let i = start; i <= end; i = add(i, { minutes: interval })) {
        times.push(i);
      }
      return times;
    }
  };

  const footer = (
    <p
      className={cn(
        "text-sm pt-3 w-full text-center",
        date ? "" : "text-rose-400"
      )}
    >
      {date ? `You selected ${format(date, "PPP")}` : "Please pick a date"}
    </p>
  );

  const disabledDays = [
    new Date(2024, 0, 10),
    new Date(2024, 0, 12),
    new Date(2024, 0, 20),
    {
      before: new Date(),
    },
  ];

  return (
    <div className="space-y-8 pt-6 max-w-xs mx-auto flex items-center flex-col">
      <Calendar
        fixedWeeks
        weekStartsOn={1}
        disabled={disabledDays}
        mode="single"
        selected={date}
        onSelect={(day) => {
          if (day !== date) setTime(undefined);
          return setDate(day);
        }}
        className="rounded-md border "
        footer={footer}
      />
      {date && (
        <HourPicker
          hours={getHours(9, 17)}
          disabledHours={appointments?.map((app) => app.date.getTime())}
        />
      )}
      {time && (
        <Button
          size={"sm"}
          variant={"primary"}
          className="w-full"
          onClick={() => setAppointment(time)}
        >
          Submit
        </Button>
      )}
    </div>
  );
};

export default DatePicker;
