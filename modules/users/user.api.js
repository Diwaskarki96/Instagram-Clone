const router = require("express").Router();
const userController = require("./user.controller");
const { isAuthenticated } = require("../../utils/passport");

const passport = require("passport");

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
router.get("/profile", isAuthenticated, (req, res) => {
  if (req.user) {
    res.render("profile", { user: req.user });
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
    const user = await userController.create(userData);
    res.redirect("/api/v1/user/login");
    //res.json({ data: user, message: "sucess" });
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
// router.post("/login", async (req, res, next) => {
//   try {
//     const { email, password } = req.body;
//     const userData = { email, password };
//     const user = await userController.login(userData);
//     res.redirect("/api/v1/user/profile");
//     // res.json({ data: user, message: "sucess" });
//   } catch (e) {
//     next(e);
//   }
// });
module.exports = router;
