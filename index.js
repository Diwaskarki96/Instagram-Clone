require("dotenv").config();
const express = require("express");
const indexRouter = require("./routes/index");
const app = express();
const PORT = process.env.PORT || 5555;

app.use("/", indexRouter);
app.listen(PORT, () => {
  console.log(`Server is running at port:${PORT}`);
});
