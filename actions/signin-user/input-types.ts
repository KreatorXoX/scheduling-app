import { z } from "zod";

import { SignInUserSchema } from "./schema";
import { ActionState } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof SignInUserSchema>;

export type ReturnType = ActionState<InputType, null>;
