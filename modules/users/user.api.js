const router = require("express").Router();
const userController = require("./user.controller");

router.get("/register", (req, res) => {
  res.render("register");
});
router.get("/login", (req, res) => {
  res.render("login");
});
router.get("/profile", (req, res) => {
  res.render("profile", { user: "diwas" });
});

router.post("/register", async (req, res, next) => {
  try {
    const { email, name, password } = req.body;
    if (!email) throw new Error("email is missing");
    if (!name) throw new Error("name is missing");
    if (!password) throw new Error("password is missing");
    const userData = { email, name, password };
    const user = await userController.create(userData);
    res.redirect("/api/v1/user/profile");
    //res.json({ data: user, message: "sucess" });
  } catch (e) {
    next(e);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userData = { email, password };
    const user = await userController.login(userData);
    res.redirect("/api/v1/user/profile");
    //res.json({ data: user, message: "sucess" });
  } catch (e) {
    next(e);
  }
});
module.exports = router;
