import { z } from "zod";

export const registerValidator = z.object({
  username: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export const loginValidator = z.object({
  username: z.string(),
  password: z.string(),
});

export const commentValidator = z.string().max(1000);
