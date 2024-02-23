require("dotenv").config();
const express = require("express");
const indexRouter = require("./routes/index");
const errorHandler = require("./utils/errorHandler");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const { passport, sessionMiddleware } = require("./utils/passport");

const app = express();
const PORT = process.env.PORT || 5555;
const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL).then(() => {
  console.log("Database is connected");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("./public"));

// Set up session middleware
app.use(sessionMiddleware);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at port:${PORT}`);
});
