import crypto from "crypto";
import { getSheetByTitle } from "../utils/googleSheets.js";

const MAX_MEMBERS = 5;

const HEADER = [
  "Timestamp",
  "Event",
  "Team Name",
  "Registrant Name",
  "College Name",
  "Email",
  "Mobile Number",
  ...Array.from({ length: MAX_MEMBERS }, (_, i) => [
    `Member${i + 1} Name`,
    `Member${i + 1} Department`,
  ]).flat(),
  "Confirmation Hash",
];

export async function submitRegistration({
  event,
  teamName,
  name,
  collegeName,
  mailId,
  mobileNumber,
  teamMembers = [],
}) {
  const sheet = await getSheetByTitle("Registrations", HEADER);

  const hash = crypto
    .createHash("sha256")
    .update(mailId + process.env.REG_SALT + event)
    .digest("hex");

  const row = {
    Timestamp: new Date().toISOString(),
    Event: event,
    "Team Name": teamName || "",
    "Registrant Name": name,
    "College Name": collegeName,
    Email: mailId,
    "Mobile Number": mobileNumber,
    "Confirmation Hash": hash,
  };

  teamMembers.slice(0, MAX_MEMBERS).forEach((member, i) => {
    row[`Member${i + 1} Name`] = member.name || "";
    row[`Member${i + 1} Department`] = member.department || "";
  });

  await sheet.addRow(row);

  return hash;
}
