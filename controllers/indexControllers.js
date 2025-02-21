const University = require("../models/universityModel");
const User = require("../models/userModel");

exports.getHomePage = (req, res) => {
  res.status(200).render("welcome", { user: false });
};

exports.getLoginPage = (req, res) => {
  res.status(200).render("login", { user: false });
};

exports.getBlockPage = (req, res) => {
  res.status(200).render("block", { user: false });
};

exports.getUniPage = async (req, res) => {
  let entidades = await University.find({});
  res.status(200).render("university", { user: false, entidades});
};

exports.getStudentPage = async (req, res) => {
  let Users = [];
  if(req.user.rol == 'superadmin'){
    Users = await User.find({})
      .sort({ createdAt: -1 });
  } else if(req.user.rol == 'admin') {
    Users = await User.find({"university.id_university": req.user.university.id_university}).sort({ createdAt: -1 });
  }
  
  res.status(200).render("students", { user: false, Users });
};
