import { format } from "date-fns";
import { DateTime } from "@/types";
import { Button } from "../ui/button";

type Props = {
  hours?: Date[];
  onHourClick: React.Dispatch<React.SetStateAction<DateTime | undefined>>;
};

const HourPicker = ({ hours, onHourClick }: Props) => {
  return (
    <div className="grid grid-cols-5 gap-2 text-center">
      {hours?.map((hour, index) => [
        <Button
          variant={"hour"}
          size={"hour"}
          key={`${index}-hour`}
          onClick={() => onHourClick((prev) => ({ ...prev, hour }))}
        >
          {format(hour, "kk:mm")}
        </Button>,
      ])}
    </div>
  );
};

export default HourPicker;
