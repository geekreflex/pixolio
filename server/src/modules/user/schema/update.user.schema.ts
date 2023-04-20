import { z } from 'zod';

export const UpdateUserSchema = z.object({
  body: z.object({
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
    email: z.string().email(),
    password: z
      .string()
      .min(6)
      .max(50)
      .regex(
        /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d\S]+$/,
        'Password must contain at least one letter and one number'
      ),
  }),
});
