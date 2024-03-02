const router = require("express").Router();
const userModel = require("../users/user.model");
const postModel = require("./post.model");

router.get("/", async (req, res) => {
  const createdPost = await postModel.create({
    postText: "My 2nd post",
    user: "65e0b6a05d65c4b29ed92fbb",
  });
  const user = await userModel.findOne({ _id: "65e0b6a05d65c4b29ed92fbb" });
  user.posts.push(createdPost._id);
  await user.save();
  res.json({ data: createdPost, msg: "success" });
});

router.get("/allposts", async (req, res) => {
  const allPosts = await userModel
    .findOne({ _id: "65e0b6a05d65c4b29ed92fbb" })
    .populate("posts");
  res.json({ data: allPosts, msg: "success" });
});

module.exports = router;
