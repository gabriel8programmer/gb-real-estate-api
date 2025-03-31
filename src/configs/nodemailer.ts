import { createTransport } from "nodemailer";
import { z } from "zod";

const optionsSchema = z.object({
  NODEMAILER_PORT: z.number(),
  NODEMAILER_HOST: z.string(),
  NODEMAILER_AUTH_USER: z.string(),
  NODEMAILER_AUTH_PASS: z.string(),
});

const { NODEMAILER_PORT, NODEMAILER_HOST, NODEMAILER_AUTH_USER, NODEMAILER_AUTH_PASS } =
  optionsSchema.parse(process.env);

const options = {
  port: NODEMAILER_PORT,
  host: NODEMAILER_HOST,
  auth: {
    user: NODEMAILER_AUTH_USER,
    pass: NODEMAILER_AUTH_PASS,
  },
};

export const transporter = createTransport(options);
