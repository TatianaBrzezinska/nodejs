const pool = require("../db");

exports.getAll = async () => {
  const result = await pool.query("SELECT * FROM tasks ORDER BY finished_at ASC");
  return result.rows;
};
