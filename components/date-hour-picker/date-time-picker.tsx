"use client";
import React, { useState } from "react";
import { add, format } from "date-fns";

import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import HourPicker from "./hour-picker";
import { DateTime } from "@/types";

type Props = {};

const DatePicker = (props: Props) => {
  const [selectedDateTime, setSelectedDateTime] = useState<DateTime>();

  const getHours = (startHour: number, endHour: number) => {
    if (selectedDateTime?.date) {
      const start = add(selectedDateTime?.date, { hours: startHour });
      const end = add(selectedDateTime?.date, { hours: endHour });
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
        selectedDateTime?.date ? "" : "text-rose-400"
      )}
    >
      {selectedDateTime?.date
        ? `You selected ${format(selectedDateTime?.date, "PPP")}`
        : "Please pick a date"}
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
    <div className="space-y-10">
      <Calendar
        fixedWeeks
        weekStartsOn={1}
        disabled={disabledDays}
        mode="single"
        selected={selectedDateTime?.date}
        onSelect={(day) => {
          setSelectedDateTime((prev) => ({ ...prev, date: day }));
        }}
        className="rounded-md border"
        footer={footer}
      />
      {selectedDateTime?.date && (
        <HourPicker hours={getHours(9, 17)} onHourClick={setSelectedDateTime} />
      )}
    </div>
  );
};

export default DatePicker;
