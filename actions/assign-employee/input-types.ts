import { z } from "zod";

import { Appointment } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { AssignEmployeeSchema } from "./schema";

export type InputType = z.infer<typeof AssignEmployeeSchema>;
export type ReturnType = ActionState<InputType, Appointment>;
