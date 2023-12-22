import { z } from "zod";

import { AssignEmployeeSchema } from "./schema";
import { ActionState } from "@/lib/create-safe-action";
import { Appointment } from "@prisma/client";

export type InputType = z.infer<typeof AssignEmployeeSchema>;
export type ReturnType = ActionState<InputType, Appointment>;
