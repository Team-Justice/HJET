const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const caseSchema = new Schema({
    _caseId: {type: Schema.Types.ObjectId, required:true},
    firstName: {type: String, required: true, trim:true},
    lastName: {type: String, required: true, trim:true},
    phoneNum: {type: Number, required: true},
    email: {type: String, required: false, trim:true},
    
    // may or may not be be better to seperate fields for address like in front end
    // will allow for easier filtering for later graph implementation
    homeAddress: {type: String, required: true, trim: true},
    city: {type: String, required: true, trim: true},
    state: {type: String, required: true, trim: true},
    zip: {type: String, required: true, trim: true},
    
    gender: {type: String, required: true},
    race: {type: String, required: true},
    ethnicity: {type: String, required: true},
    veteran: {type: String, required: true},
    accommodations: {type: String, required: true, trim: true},
    preHomeowner: {type: Boolean, required: true},
    
    // can simplify two objects into one
    ownershipOfHome: {type: String, required: true, trim: true},
    // own: {type: Boolean, required: true},
    // rent: {type: Boolean, required: true},

    // might be simpler to let the client give an estimate of how many years they've lived in home
    // i imagine older residents might struggle to provide a date
    timeInHome: {type: Number, required: true, trim: true, min: 0},
    // residencystartdate: {type: Date, required: true}, //use to compute length of time in home
    
    homeValue: {type: Number, required: true, trim: true, min: 0},
    homeAge: {type: Number, required: true, trim: true, min: 0},
    householdSize: {
        adults: {type: Number, required: true, trim: true, min: 0},
        children: {type: Number, required: true, trim: true, min: 0},
    },
    householdIncome: {type: Number, required: true, trim: true, min: 0},
    numBeds: {type: Number, required: true, trim: true, min: 0},
    numBaths: {type: Number, required: true, trim: true, min: 0},
    numSqFootage: {type: Number, required: true, trim: true, min: 0},
    recentlyRenovated: {type: Boolean, required: true},
    needRenovation: {type: Boolean, required: true},
    homeDescription: {type: String, required: true, trim: true},
}, { timestamps: true });

const Case = mongoose.model('Case', caseSchema);

module.exports = Case;