import { z } from "zod";

import { SignInUserSchema } from "./schema";
import { ActionState } from "@/lib/create-safe-action";
import { User } from "@prisma/client";

export type InputType = z.infer<typeof SignInUserSchema>;

type UserWithoutPass = Omit<User, "hashedPassword">;

export type ReturnType = ActionState<InputType, any>;
