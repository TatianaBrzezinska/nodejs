const pool = require("../db");

exports.getAllByUser = async (userId) => {
  const result = await pool.query("SELECT * FROM tasks WHERE user_id = $1 ORDER BY finished_at ASC", [userId]);
  return result.rows;
};
