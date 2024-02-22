const router = require("express").Router();
const apiRouter = require("./routes.api");
router.get("/", (req, res) => {
  res.send("index");
});
router.use("/api/v1", apiRouter);
module.exports = router;
