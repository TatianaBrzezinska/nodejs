const userModel = require('../models/userModel');
exports.getUserById = async (id) => {
  return await userModel.findById(id);
};
