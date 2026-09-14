import { ClientError } from "../errors/ApiError.js";
import { getDb, getBucket } from "../utils/firebaseAdmin.js";
import { getSheetByTitle } from "../utils/googleSheets.js";

const COLLECTION = "member_applications";
const SHEET_HEADER = [
  "Timestamp",
  "Name",
  "Email",
  "Contact Number",
  "Department",
  "Year",
  "Track",
  "LinkedIn",
  "GitHub",
  "Description",
  "Resume URL",
];

export async function submitMemberApplication(
  {
    name,
    mailId,
    contactNumber,
    department,
    year,
    track,
    linkedIn,
    github,
    description,
  },
  resumeFile
) {
  const applications = getDb().collection(COLLECTION);

  const [mailSnap, phoneSnap] = await Promise.all([
    applications.where("mailId", "==", mailId).limit(1).get(),
    applications.where("contactNumber", "==", contactNumber).limit(1).get(),
  ]);

  if (!mailSnap.empty) throw ClientError.conflict("This email is already used");
  if (!phoneSnap.empty)
    throw ClientError.conflict("This contact number is already used");

  let resumeUrl = null;
  if (resumeFile) {
    const path = `resumes/${Date.now()}-${resumeFile.originalname}`;
    const blob = getBucket().file(path);
    await blob.save(resumeFile.buffer, {
      contentType: resumeFile.mimetype,
    });
    await blob.makePublic();
    resumeUrl = blob.publicUrl();
  }

  const doc = {
    name,
    mailId,
    contactNumber,
    department,
    year,
    track,
    linkedIn: linkedIn || null,
    github: github || null,
    description,
    resumeUrl,
    createdAt: new Date(),
  };

  const ref = await applications.add(doc);

  // Also append to Google Sheets under "MemberApplications" tab
  try {
    const sheet = await getSheetByTitle("MemberApplications", SHEET_HEADER);
    await sheet.addRow({
      Timestamp: new Date().toISOString(),
      Name: name,
      Email: mailId,
      "Contact Number": contactNumber,
      Department: department,
      Year: year,
      Track: track,
      LinkedIn: linkedIn || "",
      GitHub: github || "",
      Description: description,
      "Resume URL": resumeUrl || "",
    });
  } catch (sheetErr) {
    console.error("Failed to record member application in Google Sheet:", sheetErr.message);
  }

  return { id: ref.id, resumeUrl };
}
