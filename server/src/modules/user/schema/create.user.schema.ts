import { z } from 'zod';

export const CreateUserSchema = z.object({
  body: z.object({
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
    email: z.string().email(),
    username: z.string().min(4).max(50),
  }),
});
