const User = require("../models/User");

const listUsers = async (req, res) => {
  const users = await User.find().limit(50).lean();
  res.json(users);
};

module.exports = { listUsers };
