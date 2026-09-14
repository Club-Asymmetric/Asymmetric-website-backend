import { ClientError } from "../errors/ApiError.js";
import { getDb } from "../utils/firebaseAdmin.js";

const COLLECTION = "member_applications";

export async function submitMemberApplication({
  name,
  mailId,
  contactNumber,
  department,
  year,
  track,
  linkedIn,
  github,
  description,
  resumeLink,
}) {
  const applications = getDb().collection(COLLECTION);

  const [mailSnap, phoneSnap] = await Promise.all([
    applications.where("mailId", "==", mailId).limit(1).get(),
    applications.where("contactNumber", "==", contactNumber).limit(1).get(),
  ]);

  if (!mailSnap.empty) throw ClientError.conflict("This email is already used");
  if (!phoneSnap.empty)
    throw ClientError.conflict("This contact number is already used");

  const resumeUrl = resumeLink || null;

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

  return { id: ref.id, resumeUrl };
}
