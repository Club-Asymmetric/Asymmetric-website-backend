const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Route to stream the MP3 file in chunks (buffer method)
app.get("/stream", (req, res) => {
  const mp3Path = path.join(__dirname, "audio.mp3"); // Replace 'audio.mp3' with your actual file name
  const stat = fs.statSync(mp3Path);
  const fileSize = stat.size;

  res.writeHead(200, {
    "Content-Type": "audio/mp3",
    "Content-Length": fileSize,
  });

  chunkSize = 0;
  const readStream = fs.createReadStream(mp3Path);
  readStream.pipe(res);
  readStream.on("data", (chunk) => {
    chunkSize += chunk.length;
    process.stdout.write(`\rStreaming ${chunkSize}/${fileSize} bytes...`);
  });
  // Optional: Add an error handler
  readStream.on("error", (err) => {
    console.error("Error reading the file:", err);
    res.sendStatus(500);
  });
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
