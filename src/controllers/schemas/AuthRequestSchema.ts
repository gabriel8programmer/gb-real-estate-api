import { z } from "zod";

export const RegisterRequestSchema = z.object({
  name: z.string(),
  email: z.string().email("Invalid format email address!"),
  password: z.string(),
});

export const LoginRequestSchema = RegisterRequestSchema.pick({ email: true, password: true });
