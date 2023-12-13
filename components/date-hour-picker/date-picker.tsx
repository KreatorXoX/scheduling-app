"use client";
import React, { useState } from "react";
import { format } from "date-fns";

import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import HourPicker from "./hour-picker";

type Props = {};

const DatePicker = (props: Props) => {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>();
  const footer = (
    <p
      className={cn(
        "text-sm pt-3 w-full text-center",
        selectedDay ? "" : "text-rose-400"
      )}
    >
      {selectedDay
        ? `You selected ${format(selectedDay, "PPP")}`
        : "Please pick a date"}
    </p>
  );

  return (
    <div className="space-y-10">
      <Calendar
        fixedWeeks
        weekStartsOn={1}
        mode="single"
        selected={selectedDay}
        onSelect={setSelectedDay}
        className="rounded-md border"
        footer={footer}
      />
      {selectedDay && <HourPicker startHour={8} endHour={19} />}
    </div>
  );
};

export default DatePicker;
