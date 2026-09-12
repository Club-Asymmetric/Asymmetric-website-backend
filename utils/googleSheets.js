import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

let doc;

async function getDoc() {
  if (doc) return doc;

  const auth = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, auth);
  await doc.loadInfo();
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
