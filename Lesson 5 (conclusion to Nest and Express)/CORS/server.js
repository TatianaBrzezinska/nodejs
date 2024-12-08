const express = require("express");
const cors = require("cors");
const app = express();
const port = 3030;

app.use(cors({ origin: "http://127.0.0.1:5500" }));

app.get("/", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("/data", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
