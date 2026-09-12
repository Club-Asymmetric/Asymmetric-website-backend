import { getSheetByTitle } from "../utils/googleSheets.js";

const HEADER = ["Timestamp", "Name", "Email", "Mobile Number", "Topic", "Message"];

export async function submitContactForm({ name, mailId, mobileNumber, topic, message }) {
  const sheet = await getSheetByTitle("ContactUs", HEADER);

  await sheet.addRow({
    Timestamp: new Date().toISOString(),
    Name: name,
    Email: mailId,
    "Mobile Number": mobileNumber || "",
    Topic: topic,
    Message: message,
  });
}
