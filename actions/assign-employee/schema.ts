import { z } from "zod";

export const AssignEmployeeSchema = z.object({
  employeeId: z.string().min(1),
  appointmentId: z.string().min(1),
});
