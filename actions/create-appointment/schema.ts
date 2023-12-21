import { z } from "zod";

export const CreateAppointmentSchema = z.object({
  time: z.date({
    required_error: "time is required",
    invalid_type_error: "Please enter a valid date format",
  }),
});
