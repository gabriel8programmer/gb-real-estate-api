
import { z } from "zod"

// Email validation
export const emailSchema = z.string().email('Invalid email format');

// Password validation
export const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters long') // Minimum 8 characters
  .regex(/[a-zA-Z]/, 'Password must contain at least one letter') // At least one letter
  .regex(/\d/, 'Password must contain at least one number') // At least one number
  .regex(/[@$!%*?&]/, 'Password must contain at least one special character'); // At least one special character

// Phone validation
export const phoneSchema = z.string()
  .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format'); // Basic validation for international phone numbers