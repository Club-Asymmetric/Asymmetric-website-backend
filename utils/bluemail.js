import { createTransport } from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: process.env.user,
    pass: process.env.pass,
  },
});

const mailOptions = {
  from: process.env.from,
  to: process.env.to,
  subject: process.env.subject,
  text: process.env.text,
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent: " + info.response);
  }
});
