import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

let doc;

async function getDoc() {
  if (doc) return doc;

  const rawKey = process.env.GOOGLE_PRIVATE_KEY || "";
  const key = rawKey
    .replace(/^["'\s]+|["',\s]+$/g, "")
    .replace(/\\n/g, "\n");

  const auth = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const instance = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, auth);
  await instance.loadInfo();
  doc = instance;
  return doc;
}

export async function getSheetByTitle(title, headerValues) {
  const document = await getDoc();
  let sheet = document.sheetsByTitle[title];
  if (!sheet) {
    sheet = await document.addSheet({ title, headerValues });
  }
  return sheet;
}
