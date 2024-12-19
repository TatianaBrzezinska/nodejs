const Task = require("../models/types/Task");

exports.getAllByUser = async (userId) => {
  try {
    const tasks = await Task.findAll({
      where: {
        user_id: userId,
      },
      order: [["finished_at", "ASC"]],
    });
    return tasks;
  } catch (error) {
    console.error("Error fetching tasks for user:", error);
    throw error;
  }
};
