const {
  validateEmail,
  hashPassword,
  matchPassword,
  validatePasswords,
  validateUsername
} = require("../middleware/middleware");
const { authenticate } = require("../../common/common");
const {
  createUser,
  getUsers,
  login,
  isAdmin,
  logout,
  forgotPassword,
  sendResetEmailAndRedirect,
  updateUserPassword,
  sendResetPasswordEmail
} = require("../controllers/UserController");
const passport = require("passport");
const { fbstrategy, fbLogin } = require("../controllers/FbController");
passport.use(fbstrategy);

module.exports = server => {
  server
    .route("/signup")
    .post(
      validateUsername,
      validatePasswords,
      validateEmail,
      hashPassword,
      createUser
    );
  server.route("/login").post(matchPassword, login);
  server.route("/auth/facebook").get(passport.authenticate("facebook"));
  server.route("/auth/facebook/callback").get(
    passport.authenticate("facebook", {
      failureRedirect: "/login",
      session: false
    }),
    fbLogin
  );
  server.route("/admin").get(authenticate, isAdmin);
  server.route("/logout").get(authenticate, logout);
  server
    .route("/forgotpassword")
    .post(forgotPassword, sendResetEmailAndRedirect);
  server
    .route("/reset")
    .post(
      authenticate,
      validatePasswords,
      hashPassword,
      updateUserPassword,
      sendResetPasswordEmail
    );
};
