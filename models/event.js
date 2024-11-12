import database from "../database.js";

const db = await database("event_registrations");

export function getAllEvents() {
  return db.select("event");
}

export function getEvent(name) {
  return db.query(`SELECT * FROM event WHERE name=$name`, { name });
}
