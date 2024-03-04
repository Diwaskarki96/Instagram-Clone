const router = require("express").Router();
const userController = require("./user.controller");
const { isAuthenticated } = require("../../utils/passport");
const passport = require("passport");
const userModel = require("./user.model");
const upload = require("../../utils/multer");

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
    if (!user.profileimage) {
      user.profileimage = "https://example.com/default-profile-picture.jpg";
    }
    res.render("profile", { user: user });
  } else {
    // User is not authenticated, redirect to login page
    res.redirect("/api/v1/user/login");
  }
});

router.post("/register", async (req, res, next) => {
  try {
    const { email, name, password } = req.body;
    if (!email) throw new Error("email is missing");
    if (!name) throw new Error("name is missing");
    if (!password) throw new Error("password is missing");
    const userData = { email, name, password };
    const user = await userController.exitedUser(userData.email);
    if (user) throw new Error("User existed");
    const newUser = await userController.create(userData);
    res.redirect("/api/v1/user/login");
    //res.json({ data: user, message: "sucess" });
  } catch (e) {
    console.error("e", e.message);
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
router.get("/createuser", async (req, res) => {
  const user = await userController.create({
    name: "diwas",
    email: "diwas@diwas",
    password: "diwas",
    posts: [],
  });

  res.json({ data: user, message: "sucess" });
});

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
