import DateTimePicker from "@/components/date-hour-picker";

type Props = {};

const MakeAppointmentPage = (props: Props) => {
  return (
    <div className="w-full min-h-screen relative pt-28">
      <h2 className="text-center text-lg md:text-2xl font-semibold text-neutral-700 dark:text-white">
        Pick a date and hour to make your appointment
      </h2>
      <DateTimePicker />
    </div>
  );
};

export default MakeAppointmentPage;
