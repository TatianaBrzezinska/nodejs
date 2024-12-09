const Tasks = require("../models/tasksModel");

async function getTasks(req, res) {
  try {
    const tasks = await Tasks.getAll();
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch tasks" });
  }
}

module.exports = { getTasks };
