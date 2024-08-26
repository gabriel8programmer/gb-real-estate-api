
import { z } from "zod"
import { emailSchema, passwordSchema, phoneSchema } from "./validation-shemas";

// Example of using the schema
const userSchema = z.object({
  username: z.string(),
  password: passwordSchema,
  email: emailSchema,
  phone: phoneSchema.optional(), // Makes phone optional, if needed
  role: z.string()
});

//export all validadation schemas
export { userSchema }