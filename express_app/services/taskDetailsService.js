const Task = require("../models/taskDetailsModel");

exports.getTask = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const task = await Task.getById(id, userId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.createTask = async (req, res) => {
  const { name, description, finished_at } = req.body;
  const user_id = req.user.id;

  try {
    const task = await Task.create({ name, description, finished_at, user_id });
    res.status(201).json(task);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const { name, description, finished_at } = req.body;

  try {
    const updatedTask = await Task.update(id, userId, {
      name,
      description,
      finished_at,
    });
    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found or not authorized" });
    }
    res.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const deletedTask = await Task.delete(id, userId);
    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found or not authorized" });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};
