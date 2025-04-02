import { z } from "zod";

export const MaterialStatusSchema = z.enum([
  "Single",
  "Married",
  "Divorced",
  "Widowed",
  "Separated",
  "Engaged",
]);

export const CreateClientRequestSchema = z.object({
  birthDate: z.coerce.date(),
  phone: z.string(),
  cpf: z.string(),
  rg: z.string().optional(),
  materialStatus: MaterialStatusSchema.optional(),
  gender: z.enum(["MALE", "FEMALE"]).optional(),
  userId: z.coerce.number(),
});
