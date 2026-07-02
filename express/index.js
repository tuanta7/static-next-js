const express = require("express");
const path = require("path");

const app = express();
const PORT = 3001;

// Text endpoint
app.get("/text", (req, res) => {
  console.log(`[${new Date().toISOString()}] GET /text called`);
  console.log(`User-Agent: ${req.get("user-agent")}`);
  res.json({ message: "Hello, this is plain text!" });
});

// Image endpoint - serves a simple PNG image
app.get("/image", (req, res) => {
  console.log(`[${new Date().toISOString()}] GET /image called`);
  console.log(`User-Agent: ${req.get("user-agent")}`);
  const imagePath = path.join(__dirname, "sample.png");
  res.sendFile(imagePath);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Text endpoint: http://localhost:${PORT}/text`);
  console.log(`Image endpoint: http://localhost:${PORT}/image`);
});
