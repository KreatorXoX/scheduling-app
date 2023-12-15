import { z } from "zod";

import { RegisterUserSchema } from "./schema";
import { ActionState } from "@/lib/create-safe-action";
import { User } from "@prisma/client";

export type InputType = z.infer<typeof RegisterUserSchema>;

type UserWithoutPass = Omit<User, "hashedPassword">;

export type ReturnType = ActionState<InputType, UserWithoutPass>;
