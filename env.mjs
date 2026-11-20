import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

/** "a, b ,c" -> ["a", "b", "c"] (empty entries dropped). */
const csv = z
  .string()
  .default("")
  .transform((s) => s.split(",").map((x) => x.trim()).filter(Boolean));

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    ADMIN_USERNAME: z.string().default("admin"),
    ADMIN_PASSWORD: z.string().default("twiga2024!"),
    // Telemetry: accounts that aren't real teachers (test, team, partner).
    TELEMETRY_EXCLUDED_USER_IDS: csv.pipe(z.array(z.coerce.number().int().positive())),
    TELEMETRY_EXCLUDED_SCHOOLS: csv.transform((list) => list.map((s) => s.toLowerCase())),
    // Telemetry: only count teachers whose WhatsApp number starts with this
    // country code (e.g. 255 for Tanzania). Empty counts every number.
    TELEMETRY_PHONE_PREFIX: z.string().regex(/^\d*$/, "digits only").default(""),
  },
  client: {
    // Add any client-side env vars here
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    ADMIN_USERNAME: process.env.ADMIN_USERNAME,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    TELEMETRY_EXCLUDED_USER_IDS: process.env.TELEMETRY_EXCLUDED_USER_IDS,
    TELEMETRY_EXCLUDED_SCHOOLS: process.env.TELEMETRY_EXCLUDED_SCHOOLS,
    TELEMETRY_PHONE_PREFIX: process.env.TELEMETRY_PHONE_PREFIX,
  },
});
