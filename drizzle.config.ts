import type { Config } from "drizzle-kit";
import { env } from "@/lib";

export default {
  schema: "./src/db/schema/*",
  out: "./src/drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: env.PG_URL
  }
} satisfies Config;
