const express = require("express");
const isAuth = require("../middleware/auth");
const isUniv = require("../middleware/univ");

const { getHomePage, getLoginPage, getStudentPage, getUniPage } = require("../controllers/indexControllers");

const router = express.Router();

// COMENTAR CADA RUTA A CREAR
//EJ.
//---------------------------
// POST RESGISTRO USUARIOS

// GET HOME PAGE RENDER VISTA WELCOME
router.get("/", getHomePage);
// GET LOGIN PAGE RENDER VISTA WELCOME
router.get("/login", getLoginPage);
// GET USUARIOS LOGIN RENDER VISTA BLOCK
router.get("/universidades", isUniv, getUniPage);
// GET USUARIOS LOGIN RENDER VISTA BLOCK
router.get("/estudiantes", isAuth, getStudentPage);
// GET USUARIOS LOGIN RENDER VISTA BLOCK

module.exports = router;
