const User = require("../models/types/User");

exports.create = async ({ username, password }) => {
  try {
    const user = await User.create({ username, password });
    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

exports.exists = async (username) => {
  try {
    const user = await User.findOne({
      where: { username },
      attributes: ["id"],
    });
    return !!user;
  } catch (error) {
    console.error("Error checking if user exists:", error);
    throw error;
  }
};

exports.findByUsername = async (username) => {
  try {
    const user = await User.findOne({
      where: { username },
    });
    return user;
  } catch (error) {
    console.error("Error finding user by username:", error);
    throw error;
  }
};
