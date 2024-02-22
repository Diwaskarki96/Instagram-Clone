const mongoose = require("mongoose");
const commonSchema = require("../../utils/commonSchema");
const plm = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});
userSchema.plugin(plm);

const userModel = mongoose.model("Members", userSchema);
module.exports = userModel;
