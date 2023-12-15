import { z } from "zod";

export const SignInUserSchema = z.object({
  email: z.string().min(5, { message: "Please enter a valid email" }),
  password: z
    .string({
      required_error: "password is required",
      invalid_type_error: "Please enter a valid string",
    })
    .min(5, { message: "Password must be greater than or equal to 5 chars" }),
});
