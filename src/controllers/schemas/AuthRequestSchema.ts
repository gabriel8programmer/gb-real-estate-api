import { z } from "zod";

export const RegisterRequestSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});
