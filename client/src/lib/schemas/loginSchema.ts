import { z } from "zod";

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6, {
    message: "Password must be at least 6 charcters",
  }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
