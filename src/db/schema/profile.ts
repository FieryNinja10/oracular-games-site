import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  pgEnum,
  boolean,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

import { users } from "@/db/schema/next-auth";

// profile tables

export const friendStatus = pgEnum("friendStatus", ["pending", "accepted"]);

export const profiles = pgTable("profile", {
  userId: text("userId")
    .unique()
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  birthday: timestamp("birthday", { mode: "date" }).notNull(),
  newsletter: boolean("newsletter"),
  createdAt: timestamp("createdAt", { mode: "date" }).default(sql`now()`),
  updatedAt: timestamp("updatedAt", { mode: "date" }).default(sql`now()`),
});

export const friends = pgTable(
  "friend",
  {
    profileId: text("profileId")
      .notNull()
      .references(() => profiles.userId, { onDelete: "cascade" }),
    friendId: text("friendId").notNull(),
    status: friendStatus("friendStatus").notNull().default("pending"),
    createdAt: timestamp("createdAt", { mode: "date" }).default(sql`now()`),
    updatedAt: timestamp("updatedAt", { mode: "date" }).default(sql`now()`),
  },
  (friend) => ({
    compoundKey: primaryKey(friend.profileId, friend.friendId),
  }),
);
