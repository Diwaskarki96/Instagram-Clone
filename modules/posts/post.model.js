const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    postText: { type: String },
    image: { type: String },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Members" }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Members" },
  },
  { timestamps: true }
);
const postModel = mongoose.model("Post", postSchema);
module.exports = postModel;
