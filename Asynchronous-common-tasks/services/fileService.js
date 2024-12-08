const fs = require("fs");
const path = require("path");
const {
  saveFileToDatabase,
  getFilesFromDatabase,
} = require("../models/fileModel");
const { broadcast } = require("./webSocketService");

const saveFileToDatabaseService = async (filename, base64Data) => {
  const fileBuffer = Buffer.from(base64Data, "base64");
  await saveFileToDatabase(filename, fileBuffer);
  broadcast({
    event: "fileSaved",
    data: { filename },
  });
};

const saveFileToFileSystemService = (filename, base64Data) => {
  const fileBuffer = Buffer.from(base64Data, "base64");
  const filePath = path.join("/usr/src/app/uploads", filename);
  fs.writeFileSync(filePath, fileBuffer);
  return filePath;
};

const getFilesService = async () => {
  return await getFilesFromDatabase();
};

module.exports = {
  saveFileToDatabaseService,
  saveFileToFileSystemService,
  getFilesService,
};
