import { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { users } from "./schema/next-auth";

let minDate: Date = new Date();
let maxDate: Date = new Date();

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
        minDate = new Date("1900-01-01");
        return value >= minDate && value <= maxDate;
      }, `Date must be between ${minDate.toLocaleDateString()} and ${maxDate.toLocaleDateString()}`),
    newsletter: z.boolean().optional(),
  }),
);
