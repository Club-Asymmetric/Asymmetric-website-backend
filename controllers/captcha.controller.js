export const getCaptcha = (req, res) => {};

import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());
app.use(express.static("public")); // Serve static files for the frontend

let captchaText = "";
let captchaTimeout = null;

// Function to generate a random case-sensitive and order-sensitive captcha
function generateCaptcha(length = 10) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

app.get("/captcha", (req, res) => {
  if (captchaTimeout) clearTimeout(captchaTimeout); // Clear previous timeout
  captchaText = generateCaptcha();
  res.json({ captcha: captchaText });
});

app.post("/validate-captcha", (req, res) => {
  const { userInput } = req.body;
  console.log("userInput");
  if (userInput == captchaText) {
    captchaText = ""; // Reset captcha after validation
    clearTimeout(captchaTimeout);
    res.json({ success: true, message: "Captcha validated successfully!" });
  } else {
    res.json({ success: false, message: "Invalid captcha. Please try again." });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
