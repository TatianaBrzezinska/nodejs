const pool = require("../db");

const saveFileToDatabase = async (filename, data) => {
  return pool.query("INSERT INTO files (filename, data) VALUES ($1, $2)", [
    filename,
    data,
  ]);
};

const getFilesFromDatabase = async () => {
  const result = await pool.query(
    "SELECT id, filename, uploaded_at FROM files",
  );
  return result.rows;
};

module.exports = {
  saveFileToDatabase,
  getFilesFromDatabase,
};
