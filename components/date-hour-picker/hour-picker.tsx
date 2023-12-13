import HourItem from "./hour-item";

type Props = { startHour: number; endHour: number };

const HourPicker = ({ startHour, endHour }: Props) => {
  const hours = [];
  for (let i = startHour; i <= endHour; i++) {
    hours.push(i);
  }

  return (
    <div className="grid grid-cols-5 gap-2 text-center">
      {hours.flatMap((hour, index) => [
        <HourItem key={`${index}-0`} innerText={`${hour}:00`} />,
        <HourItem key={`${index}-1`} innerText={`${hour}:30`} />,
      ])}
    </div>
  );
};

export default HourPicker;
