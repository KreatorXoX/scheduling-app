import { z } from "zod";

export const CreateAppointmentSchema = z.object({
  userId: z
    .string({
      required_error: "Id is required",
      invalid_type_error: "Please enter a valid string",
    })
    .min(3, { message: "Title must be greater than or equal to 3" }),
  time: z.date({
    required_error: "time is required",
    invalid_type_error: "Please enter a valid date format",
  }),
});
