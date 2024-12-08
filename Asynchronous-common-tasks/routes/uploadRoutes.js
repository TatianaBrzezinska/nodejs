const express = require("express");
const {
  saveFileToDatabaseService,
  saveFileToFileSystemService,
} = require("../services/fileService");

const router = express.Router();

router.post("/upload", async (req, res) => {
  try {
    const { filename, data } = req.body;
    if (!filename || !data) {
      return res.status(400).send("Filename and data are required.");
    }
    await saveFileToDatabaseService(filename, data);
    res.send({ message: "File saved to database.", filename });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error saving file to database.");
  }
});

router.post("/upload-to-fs", async (req, res) => {
  try {
    const { filename, data } = req.body;
    if (!filename || !data) {
      return res.status(400).send("Filename and data are required.");
    }
    const filePath = saveFileToFileSystemService(filename, data);
    res.send({ message: "File saved to file system.", filePath });
  } catch (err) {
    res.status(500).send("Error saving file to file system.");
  }
});

module.exports = router;
