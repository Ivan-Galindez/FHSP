const bcrypt = require("bcrypt");
const validator = require("validator");
const passport = require("passport");
const User = require("../../models/userModel");
//superadmin, admin, productor
exports.postLogin = (req, res, next) => {
};

exports.getLogin = (req, res) => {
  console.log('get login')
  res.status(200).render("login", {});
};

exports.postLogin = (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
};

exports.getLogout = (req, res) => {
  req.logOut();
  req.flash("success_msg", "Cierre de sesión con éxito");
  res.status(200).redirect("/login");
};