import { z } from "zod";

import { CreateAppointmentSchema } from "./schema";
import { ActionState } from "@/lib/create-safe-action";
import { Appointment } from "@prisma/client";

export type InputType = z.infer<typeof CreateAppointmentSchema>;
export type ReturnType = ActionState<InputType, Appointment>;
