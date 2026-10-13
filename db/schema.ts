import {
  pgTable,
  pgEnum,
  text,
  timestamp,
  serial,
  varchar,
  json,
  date,
  integer,
  boolean,
} from "drizzle-orm/pg-core";

// User states enum values
export const userStates = [
  "blocked",
  "rate_limited",
  "approved",
  "onboarding",
  "active",
  "inactive",
  "in_review",
] as const;
export const onboardingStates = [
  "new",
  "personal_info_submitted",
  "completed",
] as const;
export const roles = ["admin", "teacher"] as const;

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }),
  wa_id: varchar("wa_id", { length: 20 }).notNull().unique(),
  state: varchar("state", { length: 50 }).default("approved").notNull(),
  onboarding_state: varchar("onboarding_state", { length: 50 }).default("new"),
  role: varchar("role", { length: 20 }).default("teacher").notNull(),
  class_info: json("class_info").$type<Record<string, string[]>>(),
  school_name: varchar("school_name", { length: 100 }),
  birthday: date("birthday"),
  region: varchar("region", { length: 50 }),
  last_message_at: timestamp("last_message_at", { withTimezone: true }),
  created_at: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updated_at: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

// Teacher chat turns. Content, tool calls and cron fields are omitted on
// purpose: the dashboard only counts messages, it never reads what was said.
export const messageRole = pgEnum("messagerole", [
  "user",
  "assistant",
  "tool",
  "system",
]);

export const messages = pgTable("messages", {
  id: integer("id").primaryKey(),
  role: messageRole("role").notNull(),
  is_present_in_conversation: boolean("is_present_in_conversation").notNull(),
  created_at: timestamp("created_at", { withTimezone: true }).notNull(),
});
