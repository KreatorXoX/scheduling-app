"use client";
import { add, format } from "date-fns";

import { cn } from "@/lib/utils";

import { useDateTime } from "@/hooks/useDateTime";

import { Calendar } from "@/components/ui/calendar";

import HourPicker from "./hour-picker";
import FormSubmitButton from "../form/form-submit";
import { useAction } from "@/hooks/useActions";
import { createAppointment } from "@/actions/create-appointment";
import toast from "react-hot-toast";
import { redirect, useRouter } from "next/navigation";

type Props = {};

const DatePicker = (props: Props) => {
  const router = useRouter();
  const { execute } = useAction(createAppointment, {
    onSuccess: (data) => {
      toast.success("Appointment created");
      router.push("/my-appointments");
    },
    onError: (err) => toast.error(err),
  });
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
    // add days if all the employees are booked
    {
      before: new Date(),
    },
  ];

  const onDateSelectHandler = (formData: FormData) => {
    const date = formData.get("date") as string;
    const time = new Date(date);
    execute({ time });
  };
  return (
    <form
      className="space-y-8 max-w-xs mx-auto flex items-center flex-col mt-10"
      action={onDateSelectHandler}
    >
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
          //  disabledHours={appointments?.map((app) => app.date.getTime())}
        />
      )}
      <input
        type="datetime"
        name="date"
        id="date"
        value={time?.toISOString()}
        className="hidden"
      />
      {time && (
        <FormSubmitButton
          innerText="Book now"
          customClasses="w-full"
          variant={"primary"}
        />
      )}
    </form>
  );
};

export default DatePicker;
