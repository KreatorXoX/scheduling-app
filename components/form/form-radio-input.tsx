"use client";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import FormErrors from "./form-errors";

type Props = {
  groupItems?: { id: string; value: string }[];
  label: string;
  onChange: (value: string) => void;
  value?: string;
  errors?: Record<string, string[] | undefined>;
};

const FormRadioInput = ({
  groupItems,
  label,
  onChange,
  value,
  errors,
}: Props) => {
  return (
    <RadioGroup
      id={label}
      defaultValue={value}
      value={value}
      className={cn(
        "text-sm flex flex-col items-center gap-4 pt-2",
        errors ? "border-rose-500/40" : ""
      )}
      aria-describedby={`error-${label}`}
      onValueChange={(e) => onChange(e)}
    >
      <span>{label}</span>
      <div className="flex justify-center items-center gap-4">
        {groupItems?.map((item) => {
          return (
            <div key={item.id} className="flex items-center gap-1">
              <RadioGroupItem value={item.value} id={item.id} />
              <Label htmlFor={item.id}>{item.value.toUpperCase()}</Label>
            </div>
          );
        })}
      </div>
      <FormErrors id={label} errors={errors} />
    </RadioGroup>
  );
};

export default FormRadioInput;
