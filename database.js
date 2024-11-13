import { Surreal } from "surrealdb";
import { surrealdbNodeEngines } from "@surrealdb/node";

const db = new Surreal({
  engines: surrealdbNodeEngines(),
});

export default async () => {
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
