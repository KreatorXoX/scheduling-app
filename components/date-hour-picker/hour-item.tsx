"use client";
import { useState } from "react";
import { setHours, setMinutes, setSeconds } from "date-fns";

import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type Props = { innerText: string };

const HourItem = ({ innerText }: Props) => {
  const [selectedHour, setSelectedHour] = useState<string>();

  const onHourPickHandler = () => {
    setSelectedHour(innerText);
    // Assume you have a date from a date picker
    const pickedDate = new Date();

    // Assume you have a time from the hour picker
    const pickedHour = parseInt(innerText.split(":")[0]);
    const pickedMinutes = parseInt(innerText.split(":")[1]);

    // Combine the date and time
    const combinedDateTime = setSeconds(
      setMinutes(setHours(pickedDate, pickedHour), pickedMinutes),
      0
    );
  };

  return (
    <Button
      size={"hour"}
      variant={"hour"}
      onClick={onHourPickHandler}
      className={cn(selectedHour === innerText ? "bg-red-500" : "")}
    >
      {innerText}
    </Button>
  );
};

export default HourItem;
