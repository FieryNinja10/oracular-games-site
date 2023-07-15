import { z } from "zod";

export const UserRegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password should be at least 6 characters"),
  username: z
    .string()
    .min(3, "Password should be at least 3 characters")
    .regex(
      /^(?!^[ _-])(?!.*[ _-]{2,})(?!.*[ _-]$)(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*()_+\=\[\]{}\\|;:'",.<>\/? -]{4,20}$/g,
      "Invalid username"
    )
    .optional(),
  birthday: z.date(),
  newsletter: z.boolean().optional()
});

export type UserRegisterType = z.infer<typeof UserRegisterSchema>;
