const LocalStrategy = require("passport-local").Strategy;
const userModel = require("../modules/users/user.model");
const bcrypt = require("bcryptjs");

const initializingPassport = (passport) => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const user = await userModel.findOne({ email: email });
          if (!user) return done(null, false);
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) return done(null, false);

          return done(null, user);
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await userModel.findById(id);
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  });
};
isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated) return next();
  res.redirect("/api/v1/user/profile");
};
module.exports = { initializingPassport, isAuthenticated };
