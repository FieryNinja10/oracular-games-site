import { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { users } from "./schema/next-auth";

export const userRegisterSchema = createInsertSchema(users).merge(
  z.object({
    birthday: z
      .string()
      .transform((value) => {
        const date = new Date(value);
        if (isNaN(date.getTime())) {
          throw new Error("Invalid date format. Please use MM/DD/YYYY format.");
        }
        return date;
      })
      .refine((value) => {
        const minDate = new Date("1900-01-01");
        const maxDate = new Date("2099-12-31");
        return value >= minDate && value <= maxDate;
      }, "Date must be between 01/01/1900 and 12/31/2099"),
    newsletter: z.boolean().optional()
  })
);
