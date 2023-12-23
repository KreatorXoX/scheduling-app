import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function intersectionOfUnavailableDates<Date>(...arrays: Date[][]) {
  if (arrays.length === 0) {
    return [];
  }

  const commonValues = arrays.reduce((accumulator, currentArray) => {
    return accumulator.filter((value) =>
      currentArray.some((date) => +date === +value)
    );
  }, arrays[0]);

  return commonValues;
}
