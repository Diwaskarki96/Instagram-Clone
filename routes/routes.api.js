const router = require("express").Router();
const userRouter = require("../modules/users/user.api");
const postRouter = require("../modules/posts/post.api");

router.use("/user", userRouter);
router.use("/post", postRouter);

module.exports = router;
