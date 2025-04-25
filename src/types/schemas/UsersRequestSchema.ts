import { z } from "zod";

export const UsersRequestQueryParams = z
  .object({
    page: z.coerce.number(),
    pageSize: z.coerce.number(),
    name: z.string().min(1, "Name must contain at least one or more characters"),
    email: z.string().email("Invalid email address!"),
    role: z.enum(["ADMIN", "AGENT", "CLIENT"]),
    emailVerified: z.coerce.boolean(),
    enabled: z.coerce.boolean(),
    orderBy: z.enum(["name", "email", "createdAt"]),
    order: z.enum(["asc", "desc"]),
    createdAt: z.coerce.date(),
  })
  .partial();

export const CreateUsersRequestSchema = z.object({
  name: z.string(),
  email: z.string().email("Invalid email address!"),
  password: z.string().optional(),
  role: z.enum(["ADMIN", "AGENT", "CLIENT"]).optional(),
  emailVerified: z.boolean().optional(),
  enabled: z.boolean().optional(),
});

export const UpdateUsersRequestSchema = CreateUsersRequestSchema.partial();
