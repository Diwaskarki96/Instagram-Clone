const userModel = require("./user.model");
const bcrypt = require("bcryptjs");

const create = async (payload) => {
  const salt = await bcrypt.genSalt(10);
  payload.password = await bcrypt.hash(payload.password, salt);
  return await userModel.create(payload);
};

// const login = async (userData) => {
//   const { email, password } = userData;
//   const user = await userModel.findOne({ email });
//   if (!user) throw new Error("User not found");
//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) throw new Error("Invalid password");
//   return user;
// };
const exitedUser = async (email) => {
  return await userModel.findOne({ email });
};
module.exports = { create, exitedUser };
