const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        registro: {
            identification: {type: String, required: true},
            password: {type: String, required: true},
        },
        rol: {type: String, default: 'user'}, //roles:  superadmin, admin, user
        state: {type: String, default: 'espera'},
        university: {
            id_university: {type: String},
            university_name: {type: String},
        },
        profile: {
            name: {type: String},
            identification_type: {type: String},
            identification: {type: String},
            email: {type: String},
            phone: {type: String},
            sexo: {type: String},
            profesion: {type: String},
            semestre: {type: String},
        },
        photo: {type: String},
    },  
    { timestamps: true }
);
const User = mongoose.model('User', userSchema);
module.exports = User;