const bcrypt = require("bcrypt");
const validator = require("validator");
const passport = require("passport");

const User = require("../../models/userModel");

exports.getLogin = (req, res) => {
  res.status(200).render("authentication/login", {});
};

exports.getRegister = (req, res) => {
  res.status(200).render("authentication/register", { user: false });
};

exports.getLogout = (req, res) => {
  req.logOut();
  req.flash("success_msg", "Cierre de sesión con éxito");
  res.status(200).redirect("/login");
};