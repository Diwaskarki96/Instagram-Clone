const router = require("express").Router();
const userController = require("./user.controller");
const { isAuthenticated } = require("../../utils/passport");
const passport = require("passport");
const userModel = require("./user.model");
const upload = require("../../utils/multer");
const { userValidation } = require("./user.validation");

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/api/v1/user/login");
  });
});

router.get("/register", (req, res) => {
  res.render("register", { err: req.flash("error") });
});
router.get("/login", (req, res) => {
  res.render("login", { err: req.flash("error") });
});
router.get("/profile", isAuthenticated, async (req, res) => {
  if (req.user) {
    const user = await userModel
      .findOne({ email: req.user.email })
      .populate("posts");

    res.render("profile", { user: user });
  } else {
    // User is not authenticated, redirect to login page
    res.redirect("/api/v1/user/login");
  }
});

router.post("/register", async (req, res, next) => {
  try {
    const data = req.body;
    const validateData = await userValidation.validate(data);

    const user = await userController.findByEmail({ email: req.body.email });
    if (user) throw new Error("User existed");
    const newUser = await userController.create(validateData);
    //  res.redirect("/api/v1/user/login");
    res.json({ data: newUser, message: "sucess" });
  } catch (e) {
    next(e);
  }
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/api/v1/user/register",
    failureFlash: "Invalid username or password.",
  }),
  function (req, res) {
    res.redirect("/api/v1/user/profile");
  }
);

//-----------editProfile-------------
router.get("/editprofile", isAuthenticated, async (req, res) => {
  const user = await userModel.findOne({ email: req.user.email });
  res.render("editProfile", { user });
});
router.post(
  "/editprofile",
  isAuthenticated,
  upload.single("file"),
  async (req, res) => {
    const user = await userModel.findOneAndUpdate(
      { email: req.user.email },
      { name: req.body.name, bio: req.body.bio },
      { new: true }
    );
    if (req.file) {
      user.profileimage = req.file.filename;
    }
    await user.save();
    res.redirect("/api/v1/user/profile");
  }
);
//-------------------------------------------
module.exports = router;
