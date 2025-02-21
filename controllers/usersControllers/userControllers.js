const Nodemailer = require('nodemailer');
const Config = require('../../utils/config');
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require('jsonwebtoken');
const User = require("../../models/userModel");
const University = require("../../models/universityModel");

function generarToken() {
  const token = jwt.sign({}, 'secreto', { expiresIn: '1h' });
  return token;
}


exports.getUserAll = async (req, res) => {
  try {
    // if (req.user.rol != "superadmin") return res.status(400).json({ message: "no tienes permiso para esta solicitud" });
    if(req.user.rol == 'superadmin'){
      let users = await User.find({})
        .select(
          "-registro"
          // "-permisos",
          // "-productor_type",
          // "-notifications"
        )
        .sort({ createdAt: -1 });
      res.status(200).json(users);
    } else if(req.user.rol == 'admin') {
        let users = await User.find({"center.id_center": req.user.center[0].id_center});
        res.status(200).json(users);
    }
    
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getUserByIdentification = async (req, res) => {
  let identification = req.params.identification
  let id_center = req.user.center[0].id_center
  console.log(`identification ${identification}`)
  try {
    //if (req.user.rol != "admin" || req.user.rol != "superadmin"){
    //  //return res.status(400).json({ message: "no tienes permiso para esta solicitud" });
    //}
    
    if(id_center == '9008377764'){
      let user = await User.find({
        $or: [
          { "profile.identification": identification },
          { "profile.card_id": identification },
        ],
        $and: [{ state: "active" }],
      })
        .select(
          "-registro -permisos"
          //"-rol",
          //"-productor_type",
          //"-notifications"
        )
        .sort({ createdAt: -1 });
        // console.log(user)
      res.status(200).json(user);
    } else {
      let user = await User.find({
        $or: [
          { "profile.identification": identification },
          { "profile.card_id": identification },
        ],
        $and: [{ state: "active" }, {"center.id_center": id_center}],
      })
        .select(
          "-registro -permisos"
          //"-rol",
          //"-productor_type",
          //"-notifications"
        )
        .sort({ createdAt: -1 });
        // console.log(user)
      res.status(200).json(user);
    }
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
};

exports.register_uni = async (req, res) => {
  console.log('post new entidad')
  console.log(req.body)
  
  try {
      const new_entidad = new University(req.body);

      let result = await new_entidad.save();

      let identification = req.body.nit
      let password = req.body.nit
      let rol = 'admin'
      let id_university = result._id
      let university_name = result.university

      const newUser = new User({
        registro: {
          identification,
          password
        },
        rol,
        university: {
          id_university,
          university_name
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

      res.status(200).json({message:"Se agrego con exito la nueva entidad", result});
  } catch (error) {
      console.log(error)
      res.status(500).json(error);
  }
};


exports.register_student = async (req, res) => {
  console.log('register new user')
  console.log(req.body)

    try {
      User.findOne({ identification: req.body.identification })
      .then(async user => {
        if (user) {
            console.log('El usuario ya esta registrado.. verifique correo y usuario');
            return res.status(201).json({message: `Un usuario ya se encuentra registrado con el numero de id: ${req.body.identification}`});
        } else {
      
          console.log('invtando')
          let identification = req.body.identification
          let password = req.body.identification
          let rol = 'user'
          let id_university = req.user.university.id_university
          let university_name = req.user.university.university_name
    
          const newUser = new User({
            registro: {
              identification,
              password
            },
            rol,
            university: {
              id_university,
              university_name
            },
            profile: {
              name: req.body.name,
              identification_type: req.body.identification_type,
              identification: req.body.identification,
              email: req.body.email,
              phone: req.body.phone,
              sexo: req.body.sexo,
              profesion: req.body.profesion,
              semestre: req.body.semestre,
            },
            photo: req.body.photo
          });

          bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(newUser.password, salt, (err, hash) => {
                  // if (err) throw err;
                  newUser.password = hash;
                  newUser.save()
                      
              });
          });
          res.status(200).json({newUser});
        }
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({error});
    }
}


exports.getStudents = async (req, res) => {
  console.log('get students')
  console.log(req.params.university)
  try {
    if(req.user.rol == 'superadmin'){
      let users = await User.find({"university.id_university": req.params.university})
        .sort({ createdAt: -1 });
      res.status(200).json(users);
    } 
    // res.status(501).json(err);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateState = async (req, res) => {
  let id_user = req.params.id_user
  let body_data = req.body.state
  try {
    // TO DO
    let user = await User.findById(id_user);
    user.state = body_data
    await user.save()
    res.status(200).json({ message: 'Se actualizo con exito el rol del usuario', rol: body_data});
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
};