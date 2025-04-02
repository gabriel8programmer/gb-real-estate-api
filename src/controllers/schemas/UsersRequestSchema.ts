import { z } from "zod";

export const CreateUsersRequestSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().optional(),
  role: z.enum(["ADMIN", "AGENT", "CLIENT"]).optional(),
  enabled: z.boolean().optional(),
  emailVerified: z.boolean().optional(),
});

export const UpdateUsersRequestSchema = CreateUsersRequestSchema.partial();
