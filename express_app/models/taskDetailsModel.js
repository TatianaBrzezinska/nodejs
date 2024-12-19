const Task = require("../models/types/Task");

exports.getById = async (id, userId) => {
  try {
    const task = await Task.findOne({
      where: {
        id,
        user_id: userId,
      },
    });
    return task;
  } catch (error) {
    console.error("Error fetching task:", error);
    throw error;
  }
};

exports.create = async (taskData) => {
  try {
    const task = await Task.create(taskData);
    return task;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

exports.update = async (id, userId, taskData) => {
  try {
    const task = await Task.findOne({
      where: {
        id,
        user_id: userId,
      },
    });

    if (!task) {
      throw new Error("Task not found");
    }

    await task.update(taskData);
    return task;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

exports.delete = async (id, userId) => {
  try {
    const task = await Task.findOne({
      where: {
        id,
        user_id: userId,
      },
    });

    if (!task) {
      throw new Error("Task not found");
    }

    await task.destroy();
    return task;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};
