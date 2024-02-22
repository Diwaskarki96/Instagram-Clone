const router = require("express").Router();
const userRouter = require("../modules/users/user.api");
router.use("/user", userRouter);

module.exports = router;
