import database from "../database.js";

export async function getAllEvents() {
  return (await database()).select("event");
}

export async function getEvent(name) {
  return (await database()).query(`SELECT * FROM event WHERE name=$name`, {
    name,
  });
}
