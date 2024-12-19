const Tasks = require("../models/tasksModel");

async function getTasks(req, res) {
  try {
    const userId = req.user.id;
    const tasks = await Tasks.getAllByUser(userId);
    return res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return res.status(500).json({ error: "Failed to fetch tasks" });
  }
}

module.exports = { getTasks };
