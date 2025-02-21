const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

// USER MODEL
const User = require('../models/userModel');

module.exports = (passport) => {
    passport.use(new LocalStrategy({ usernameField: 'identification' }, async (identification, password, done) => {
        try {
            // MATCH USER
            console.log(identification)
            const user = await User.findOne({ "registro.identification": identification});
            
            if(!user) {
                // null => error
                // false => user
                // options => a JS object
                return done(null, false, { message: 'Identificación no registrada!'});
            }
            // MATCH PASSWORD
            await bcrypt.compare(password, user.registro.password, (err, same) => {
                if(err) {
                    throw err;
                }
                if(same) {
                    console.log('contrasena correcta')
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Contraseña incorrecta' });
                }
            })
        } catch (error) {
            console.log(error);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        await User.findById(id, (err, user) => {
            done(err, user);
        });
    });
}
