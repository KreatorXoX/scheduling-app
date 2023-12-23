import { z } from "zod";
import { User } from "next-auth/types";

import { ActionState } from "@/lib/create-safe-action";

import { CreateUserSchema } from "./schema";

export type InputType = z.infer<typeof CreateUserSchema>;
export type ReturnType = ActionState<InputType, User>;
