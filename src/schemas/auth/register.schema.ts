import * as z from 'zod';

export const RegisterSchema = z.object({
  name: z.string().nonempty('Name is required'),
  email: z.email('Enter a valid email'),
  password: z.string().min(6, 'Enter at least 6 characters'),
  address: z.string().nonempty('Address is required'),
  city: z.string().nonempty('City is required'),
  state: z.string().nonempty('State is required'),
});

export type RegisterProps = z.infer<typeof RegisterSchema>;
