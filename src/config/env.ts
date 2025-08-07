import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.coerce.string(),
  PORT: z.string().optional(),
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
});

export const env = envSchema.parse(process.env);
