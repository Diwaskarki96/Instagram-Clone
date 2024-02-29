require("dotenv").config();
const express = require("express");
const indexRouter = require("./routes/index");
const errorHandler = require("./utils/errorHandler");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const expressSession = require("express-session");
const { initializingPassport } = require("./utils/passport");

const flash = require("connect-flash");
const app = express();
const PORT = process.env.PORT || 5555;
const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL).then(() => {
  console.log("Database is connected");
});

// Initialize Passport
initializingPassport(passport);
app.use(
  expressSession({ secret: "secret", resave: false, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: true }));
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("./public"));

// Set up session middleware
//app.use(sessionMiddleware);

app.use(flash());
app.use("/", indexRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at port:${PORT}`);
});
