import { z } from "zod";

export const RegisterAuthRequestSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  role: z.enum(["ADMIN", "AGENT", "CLIENT"]).default("CLIENT"),
  enabled: z.boolean().optional(),
});

export const LoginAuthRequestSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
