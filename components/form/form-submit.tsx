"use client";
import { useFormStatus } from "react-dom";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

type Props = {
  innerText?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "primary";
  disabled?: boolean;
  customClasses?: string;
};

const FormSubmitButton = ({
  innerText = "Submit",
  variant,
  disabled,
  customClasses,
}: Props) => {
  const { pending } = useFormStatus();
  return (
    <Button
      size={"sm"}
      variant={variant || "primary"}
      type="submit"
      disabled={disabled || pending}
      className={cn("text-sm", customClasses)}
    >
      {innerText}
    </Button>
  );
};

export default FormSubmitButton;
