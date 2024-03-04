const router = require("express").Router();
const userModel = require("../users/user.model");
const postModel = require("./post.model");
const upload = require("../../utils/multer");
const { isAuthenticated } = require("../../utils/passport");

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

//-------------upload---------------
router.get("/upload", isAuthenticated, (req, res) => {
  res.render("upload");
});
router.post(
  "/upload",
  upload.single("file"),
  isAuthenticated,
  async (req, res) => {
    if (!req.file) {
      return res.json({ data: "no files were uploaded" });
    }
    const user = await userModel.findOne({ email: req.user.email });

    const post = await postModel.create({
      image: req.file.filename,
      postText: req.body.caption,
      user: user._id,
    });
    user.posts.push(post._id);
    await user.save();

    res.redirect("/api/v1/user/profile");
  }
);

//----------------------------------------
//----------------Feed------------------------
router.get("/feed", isAuthenticated, async (req, res) => {
  const posts = await postModel.find().populate("user");
  const user = await userModel.find();

  res.render("feed", { posts, user });
});
//----------------------------------------

router.get("/allposts", async (req, res) => {
  const allPosts = await userModel
    .findOne({ _id: "65e0b6a05d65c4b29ed92fbb" })
    .populate("posts");
  res.json({ data: allPosts, msg: "success" });
});

module.exports = router;
