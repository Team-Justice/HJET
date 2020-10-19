const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {type: String, required: true, trim:true},
    lastName: {type: String, required: true, trim:true},
    phoneNum: {type: Number, required: true},
    email: {type: String, required: true, trim:true},
    password: {type: String, required: true, trim: true},
    admin: {type: Boolean, required: true},
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;