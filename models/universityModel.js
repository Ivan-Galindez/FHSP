const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const university_schema = new Schema(
    {
        university: {type: String},
        nit: {type: String},
        email: {type: String},
        phone: {type: String},
        country: {type: String},
        department: {type: String},
        department_code: {type: String},
        city: {type: String},
        city_code: {type: String},
        address: {type: String},
        url: {type: String},
        state: {type: String, default: 'active'}, // or block
        icon_name: {type: String},
    },
    { timestamps: true }
);

const University = mongoose.model('University', university_schema);
module.exports = University;