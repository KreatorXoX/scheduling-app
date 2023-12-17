"use client";
import { format } from "date-fns";

import { useDateTime } from "@/hooks/useDateTime";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

type Props = {
  hours?: Date[];
  disabledHours?: number[];
};

const HourPicker = ({ hours, disabledHours }: Props) => {
  const setTime = useDateTime((state) => state.setTime);
  const time = useDateTime((state) => state.time);

  return (
    <div className="grid grid-cols-5 gap-2 text-center">
      {hours?.map((hour, index) => {
        return (
          <Button
            variant={"hour"}
            size={"hour"}
            key={`${index}-hour`}
            onClick={() => {
              setTime(hour);
            }}
            disabled={disabledHours?.includes(hour.getTime())}
            className={cn(
              " dark:disabled:bg-gray-500 ",
              time?.getTime() === hour.getTime()
                ? "bg-sky-600 text-white hover:bg-sky-500"
                : ""
            )}
          >
            {format(hour, "kk:mm")}
          </Button>
        );
      })}
    </div>
  );
};

export default HourPicker;
