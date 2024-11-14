import { Surreal } from "surrealdb";
import { surrealdbNodeEngines } from "@surrealdb/node";

let db;
export default async () => {
  if (db) return db;
  db = new Surreal({
    engines: surrealdbNodeEngines(),
  });
  try {
    await db.connect("http://localhost:8000/rpc", {
      namespace: "asymmetric",
      database: "asymmetric",
      auth: {
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
