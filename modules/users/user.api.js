const router = require("express").Router();
router.get("/", (req, res) => {
  res.send("user is working");
});

module.exports = router;
