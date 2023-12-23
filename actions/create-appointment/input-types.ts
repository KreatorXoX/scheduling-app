import { z } from "zod";

import { Appointment } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { CreateAppointmentSchema } from "./schema";

export type InputType = z.infer<typeof CreateAppointmentSchema>;
export type ReturnType = ActionState<InputType, Appointment>;
