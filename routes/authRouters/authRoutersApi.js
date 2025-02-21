const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  postLogin,
  getLogin,
  getLogout,
} = require("../../controllers/authControllers/authControllerApi");

const User = require("../../models/userModel");
const bcrypt = require('bcrypt');

// Login Handle
// Get the login page
router.get("/login", getLogin);
// Login Handle
router.post("/login", postLogin);
// Logout handle
router.get("/logout", getLogout);


// *****************************************************************************************************************//
setTimeout(() => {
  console.log("Consultando usuario administrador....")
  User.findOne({ 'registro.identification': '1234567' })
      .then(async user => {
          if (user) {
              console.log('El usuario ya esta registrado...');
          } else {
              let identification = '1234567'
              let password = '1234567'
              let rol = 'superadmin'
              let id_center = '1234567'
              let center_name = 'Fundacion Hospital San Pedro'

              const newUser = new User({
                registro: {
                  identification,
                  password
                },
                rol,
                center:{
                  id_center,
                  center_name
                }
              });
              bcrypt.genSalt(10, (err, salt) => {
                  bcrypt.hash(newUser.registro.password, salt, (err, hash) => {
                      if (err) throw err;
                      newUser.registro.password = hash;
                      newUser
                          .save()
                          .then(user => {
                              console.log("Su cuenta se creo con exito, " + identification + " ir a iniciar sesion")
                          })
                          .catch(err => console.log(err));
                  });
              });
          }
      });
}, 1000);

// }

// *****************************************************************************************************************//
// Consulta all usuarios

module.exports = router;
