import z from "zod";

const passwordValidation = new RegExp(
  /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/
);

export const registerSchema = z.object({
  email: z.email(),
  password: z.string().regex(passwordValidation, {
    message:
      "Password must have 1 lowercase alphabet, 1 uppercase alphabet, 1 number, 1 special character and atleast 8 characters",
  }),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
