const pool = require("../db");

exports.getById = async (id, userId) => {
  const result = await pool.query("SELECT * FROM tasks WHERE id = $1 AND user_id = $2", [id, userId]);
  return result.rows[0];
};

exports.create = async (taskData) => {
  const { name, description, finished_at, user_id } = taskData;
  const result = await pool.query("INSERT INTO tasks (name, description, finished_at, user_id) VALUES ($1, $2, $3, $4) RETURNING *", [name, description, finished_at, user_id]);
  return result.rows[0];
};

exports.update = async (id, userId, taskData) => {
  const { name, description, finished_at } = taskData;
  const result = await pool.query("UPDATE tasks SET name = $1, description = $2, finished_at = $3 WHERE id = $4 AND user_id = $5 RETURNING *", [name, description, finished_at, id, userId]);
  return result.rows[0];
};

exports.delete = async (id, userId) => {
  const result = await pool.query("DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *", [id, userId]);
  return result.rows[0];
};
