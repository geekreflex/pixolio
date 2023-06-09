import { z } from 'zod';

export const AuthSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});
