import DateTimePicker from "@/components/date-hour-picker";
import React from "react";

type Props = {};

const MakeAppointmentPage = (props: Props) => {
  return (
    <div className="w-full min-h-screen relative">
      <h2 className="text-center pt-10 text-2xl font-semibold">
        Pick a date and hour to make your appointment
      </h2>
      <DateTimePicker />
    </div>
  );
};

export default MakeAppointmentPage;
