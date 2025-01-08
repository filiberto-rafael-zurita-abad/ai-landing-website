import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

export default {
  schema: './db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    host: 'ep-proud-leaf-a56t0nbi.us-east-2.aws.neon.tech',
    user: 'neondb_owner',
    password: 'W43UiNQVJdDm',
    database: 'neondb',
    ssl: true,
  },
} satisfies Config;
