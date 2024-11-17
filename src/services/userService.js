const User = require("../models/user");
const Comment = require("../models/comment");
const client = require("../redisClient");

const calculateExpirationInSeconds = (expirationDate) => {
  const now = new Date();
  const expirationTime = new Date(expirationDate);
  return Math.floor((expirationTime - now) / 1000);
};

const findUserById = async (userId, expirationDate) => {
  const cacheKey = `user:${userId}`;
  const cachedUser = await client.get(cacheKey);
  if (cachedUser) {
    return JSON.parse(cachedUser);
  }
  const user = await User.findById(userId);
  if (user) {
    const expirationInSeconds = calculateExpirationInSeconds(expirationDate) || 3600;
    await client.set(cacheKey, JSON.stringify(user), { EX: expirationInSeconds });
  }
  return user;
};

const createUser = async (data, expirationDate) => {
  const user = new User(data);
  const newUser = await user.save();
  const cacheKey = `user:${newUser._id}`;
  const expirationInSeconds = calculateExpirationInSeconds(expirationDate) || 3600;
  await client.set(cacheKey, JSON.stringify(newUser), { EX: expirationInSeconds });
  return newUser;
};

const updateUser = async (data, expirationDate) => {
  const { id, name, email, age } = data;
  const updatedUser = await User.findByIdAndUpdate(
    id,
    { name, email, age },
    { new: true },
  );
  if (updatedUser) {
    const cacheKey = `user:${id}`;
    const expirationInSeconds = calculateExpirationInSeconds(expirationDate) || 3600;
    await client.set(cacheKey, JSON.stringify(updatedUser), { EX: expirationInSeconds });
  }
  return updatedUser;
};

const createComment = async (data, expirationDate) => {
  const comment = new Comment(data);
  const newComment = await comment.save();
  const userCommentsCacheKey = `user_comments:${newComment.userId}`;
  const comments = await Comment.find({ userId: newComment.userId }).populate(
    "userId",
  );
  const expirationInSeconds = calculateExpirationInSeconds(expirationDate) || 3600;
  await client.set(userCommentsCacheKey, JSON.stringify(comments), {
    EX: expirationInSeconds,
  });
  return newComment;
};

const createManyComments = async (commentsData) => {
  return await Comment.insertMany(commentsData);
};

const updateManyComments = async (updateData) => {
  const bulkOperations = updateData.map((data) => ({
    updateOne: {
      filter: { _id: data._id },
      update: { $set: { content: data.content } },
    },
  }));
  return await Comment.bulkWrite(bulkOperations);
};

const getUserComments = async (userId, expirationDate) => {
  const cacheKey = `user_comments:${userId}`;
  const cachedComments = await client.get(cacheKey);
  if (cachedComments) {
    return JSON.parse(cachedComments);
  }
  const comments = await Comment.find({ userId }).populate("userId");
  const expirationInSeconds = calculateExpirationInSeconds(expirationDate) || 3600;
  await client.set(cacheKey, JSON.stringify(comments), { EX: expirationInSeconds });
  return comments;
};

module.exports = {
  findUserById,
  createUser,
  updateUser,
  createManyComments,
  updateManyComments,
  createComment,
  getUserComments,
};
