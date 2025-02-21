const express = require("express");
const router = express.Router();
const isAuth = require("../../middleware/auth");
const multer = require('multer');
const path = require('path');

const { getUserAll, register_uni, register_student, getStudents, updateState
} = require("../../controllers/usersControllers/userControllers");
// COMENTAR CADA RUTA A CREAR
//---------------------------

// Multer para subidad de archivos

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, './public/univ')
  },
  filename: (req, file, cb) => {
      //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      //   const uniqueSuffix = req.identification
      //   const fileExtension = path.extname(file.originalname);
      console.log(file)
      cb(null, req.body.nit + '-' + (file.originalname).toLowerCase());
  }
});
  

const storage2 = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, './public/users')
  },
  filename: (req, file, cb) => {
      //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      //   const uniqueSuffix = req.identification
      //   const fileExtension = path.extname(file.originalname);
      console.log(file)
      cb(null, req.body.identification + '-' + (file.originalname).toLowerCase());
  }
});
  
const upload = multer({ storage: storage });
const upload2 = multer({ storage: storage2 });

router.post("/register", isAuth, upload.fields([{ name: 'icon', maxCount: 1 }]), register_uni);

router.post("/estudent", isAuth, upload2.fields([{ name: 'icon', maxCount: 1 }]), register_student);

/**
 * type:GET
 * DESC: Consulta el listado de usuarios
 */
router.get("/all", getUserAll);

router.get("/students/:university/get", getStudents);

router.post("/student/:id_user/update", updateState);



module.exports = router;