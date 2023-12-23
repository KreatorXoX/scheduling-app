import { z } from "zod";

import { Role } from "@prisma/client";

export const CreateUserSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Please enter a valid string",
    })
    .min(3, { message: "Name must be greater than or equal to 3" }),
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Please enter a valid string",
    })
    .min(3, { message: "Email must be greater than or equal to 3" }),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Please enter a valid string",
    })
    .min(3, { message: "Password must be greater than or equal to 3" }),
  role: z.nativeEnum(Role),
});
