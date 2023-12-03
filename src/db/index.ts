import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "@/lib";

export const queryClient = postgres(env.PG_PRIVATE_URL);

const db: PostgresJsDatabase = drizzle(queryClient);

export default db;
