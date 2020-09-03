const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const caseSchema = new Schema({
    _id: {type: Schema.Types.ObjectId, required:true},
    firstname: {type: String, required: true, trim:true},
    lastname: {type: String, required: true, trim:true},
    ethnicity: {type: String, required: true},
    gender: {type: String, required: true},
    address: {type: String, required: true, trim: true},
    city: {type: String, required: true, trim: true},
    state: {type: String, required: true, trim: true},
    zipcode: {type: String, required: true, trim: true},
    phonenumber: {type: Number, required: true},
    homedescription: {type: String, required: true, trim: true},
    own: {type: Boolean, required: true},
    rent: {type: Boolean, required: true},
    residencystartdate: {type: Date, required: true}, //use to compute length of time in home
    estimatedvalue: {type: Number, required: true, trim: true, min: 0},
    ageofhome: {type: Number, required: true, trim: true, min: 0},
    householdincome: {type: Number, required: true, trim: true, min: 0},
    numberofadults: {type: Number, required: true, trim: true, min: 0},
    numberofchildren: {type: Number, required: true, trim: true, min: 0},
    bedrooms: {type: Number, required: true, trim: true, min: 0},
    baths: {type: Number, required: true, trim: true, min: 0},
    squarefootage: {type: Number, required: true, trim: true, min: 0},
    recentlyrenovated: {type: Boolean, required: true},
    needsrenovation: {type: Boolean, required: true},
    previoushomeowner: {type: Boolean, required: true},
    veteran: {type: String, required: true},
    accomodations: {type: String, required: true, trim: true},
}, { timestamps: true });

const Case = mongoose.model('Case', caseSchema);

module.exports = Case;