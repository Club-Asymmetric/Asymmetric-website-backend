import { Surreal } from "surrealdb";
import { surrealdbNodeEngines } from "@surrealdb/node";

let db;
export default async () => {
  if (db) return db;
  db = new Surreal({
    engines: surrealdbNodeEngines(),
  });
  try {
    await db.connect("surrealkv://asymmetric.db", {
      namespace: "asymmetric",
      database: "asymmetric",
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
