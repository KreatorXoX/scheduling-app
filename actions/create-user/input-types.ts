import { z } from "zod";

import { CreateUserSchema } from "./schema";
import { ActionState } from "@/lib/create-safe-action";
import { User } from "next-auth/types";

export type InputType = z.infer<typeof CreateUserSchema>;
export type ReturnType = ActionState<InputType, User>;
