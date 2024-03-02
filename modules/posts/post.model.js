const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  postText: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Members" },
});
const postModel = mongoose.model("Post", postSchema);
module.exports = postModel;
