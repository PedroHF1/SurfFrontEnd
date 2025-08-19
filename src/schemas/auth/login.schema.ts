import * as z from "zod";

export const LoginSchema = z.object({
  email: z.email('Enter a valid email'),
  password: z.string().min(6, 'Enter at least 6 characters'),
});

export type LoginProps = z.infer<typeof LoginSchema>;
