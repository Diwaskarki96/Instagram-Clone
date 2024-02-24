isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect("/api/v1/user/login");
};

module.exports = isLoggedIn;
