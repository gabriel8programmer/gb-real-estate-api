import { z } from "zod";

export const EnsureIsPermittedSchema = z.object({
  allowedRoles: z.array(z.enum(["ADMIN", "AGENT", "CLIENT"])).optional(),
});
