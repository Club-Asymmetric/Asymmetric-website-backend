import { Surreal } from "surrealdb";
import { surrealdbNodeEngines } from "@surrealdb/node";

export default async function (database) {
  const db = new Surreal({
    engines: surrealdbNodeEngines(),
  });

  try {
    await db.connect("surrealkv://asymmetric.db", {
      namespace: "asymmetric",
      database,
    });
  } catch (error) {
    console.error(
      "failed to connect to surrealdb",
      error instanceof Error ? error.message : String(error)
    );
    throw error;
  }
  return db;
}
