const passport = require("passport");
const expressSession = require("express-session");
const LocalStrategy = require("passport-local").Strategy; // Example: LocalStrategy for username/password authentication
const usersRouter = require("../modules/users/user.model");

// Configure Passport strategies
passport.use(new LocalStrategy(usersRouter.authenticate()));

// Serialize and deserialize user
passport.serializeUser(usersRouter.serializeUser());
passport.deserializeUser(usersRouter.deserializeUser());

// Initialize express-session middleware
const sessionMiddleware = expressSession({
  secret: "yokoso",
  saveUninitialized: true,
  resave: true,
});

// Export configured Passport instance and middleware
module.exports = { passport, sessionMiddleware };
