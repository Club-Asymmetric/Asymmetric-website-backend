import { Surreal } from "surrealdb";

let db;
export default async () => {
  if (db) return db;
  db = new Surreal();
  const surrealUrl = process.env.SURREAL_URL || "http://localhost:8000/rpc";
  try {
    await db.connect(surrealUrl, {
      namespace: "asymmetric",
      database: "asymmetric",
      authentication: {
        username: process.env.SURREAL_USER,
        password: process.env.SURREAL_PASS,
      },
    });
  } catch (error) {
    console.error(
      "failed to connect to surrealdb",
      error instanceof Error ? error.message : String(error)
    );
    throw error;
  }
  return db;
};
