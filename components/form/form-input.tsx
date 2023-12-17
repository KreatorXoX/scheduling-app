"use client";
import { forwardRef } from "react";
import { useFormStatus } from "react-dom";

import { cn } from "@/lib/utils";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import FormErrors from "./form-errors";

type Props = {
  id: string;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  customClasses?: string;
  defaultValue?: string;
  errors?: Record<string, string[] | undefined>;
  onBlur?: () => void;
};

export const FormInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      id,
      label,
      type = "text",
      placeholder,
      required,
      disabled,
      customClasses,
      defaultValue,
      errors,
      onBlur,
    },
    ref
  ) => {
    const { pending } = useFormStatus();

    return (
      <div>
        <div>
          {label ? (
            <Label htmlFor={id} className="text-neutral-700 font-semibold">
              {label}
            </Label>
          ) : null}
          <Input
            id={id}
            name={id}
            onBlur={onBlur}
            type={type}
            defaultValue={defaultValue}
            autoFocus={false}
            placeholder={placeholder}
            required={required}
            disabled={disabled || pending}
            ref={ref}
            className={cn(
              "text-sm",
              customClasses,
              errors ? "border-rose-500/40" : ""
            )}
            aria-describedby={`error-${id}`}
          />
        </div>
        <FormErrors id={id} errors={errors} />
      </div>
    );
  }
);

FormInput.displayName = "FormInput";
