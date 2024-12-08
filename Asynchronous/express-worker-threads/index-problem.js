const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

app.get("/non-blocking", (req, res) => {
  res.status(200).send("This page is non-blocking");
});

app.get("/blocking", async (req, res) => {
  let counter = 0;
  for (let i = 0; i < 50000000000; i++) {
    counter++;
  }
  res.status(200).send(`result is ${counter}`);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
// lscpu | grep "^CPU(s):"
