const express = require("express");
const { Worker } = require("worker_threads");

const app = express();
const port = process.env.PORT || 3000;

app.get("/non-blocking", (req, res) => {
  res.status(200).send("This page is non-blocking");
});

app.get("/blocking", async (req, res) => {
  try {
    const result = await runBlockingTaskInWorker();
    res.status(200).send(`result is ${result}`);
  } catch (error) {
    res.status(500).send("Error in processing");
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

function runBlockingTaskInWorker() {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./worker.js");
    worker.on("message", resolve);
    worker.on("error", reject);
    worker.on("exit", (code) => {
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`));
      }
    });
  });
}
