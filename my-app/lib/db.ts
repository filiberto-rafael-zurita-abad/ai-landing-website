import { Pool } from 'pg';

const connectionString = 'postgresql://neondb_owner:W43UiNQVJdDm@ep-proud-leaf-a56t0nbi.us-east-2.aws.neon.tech/neondb?sslmode=require';

const pool = new Pool({
  connectionString,
});

export const query = async (text: string, params?: any[]) => {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } finally {
    client.release();
  }
};

export const createSubmissionsTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS submissions (
      id SERIAL PRIMARY KEY,
      nickname VARCHAR(255),
      email VARCHAR(255),
      description TEXT,
      github VARCHAR(255),
      youtube VARCHAR(255),
      submissionNumber INTEGER,
      ipAddress VARCHAR(255),
      userAgent TEXT,
      timestamp TIMESTAMPTZ
    );
  `;
  await query(createTableQuery);
};

export const createVisitorsTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS visitors (
      id SERIAL PRIMARY KEY,
      ipAddress VARCHAR(255) UNIQUE,
      country VARCHAR(255),
      userAgent TEXT,
      timestamp TIMESTAMPTZ,
      visitCount INTEGER,
      lastVisit TIMESTAMPTZ
    );
  `;
  await query(createTableQuery);
};
