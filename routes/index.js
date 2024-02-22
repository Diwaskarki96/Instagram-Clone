const router = require("express").Router();
const apiRouter = require("./routes.api");
router.get("/", (req, res) => {
  res.send("index");
});
router.all("*", (req, res, next) => {
  try {
    res.status(404).json({ data: "", msg: "Routes not found" });
  } catch (e) {
    next(e);
  }
});

router.use("/api/v1", apiRouter);
module.exports = router;
