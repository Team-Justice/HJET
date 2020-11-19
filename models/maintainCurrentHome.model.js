const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const maintainCurrentHouseSchema = new Schema({
    caseID: {type: mongoose.Types.ObjectId, required: true},
    type: {type: String, default: 'Maintain Current Home'},
    needSignificantRepairs: {type: Boolean, required: true},
    needHealthyHomeAudit: {type: Boolean, required: true},
    needEnergyEfficiencyAudit: {type: Boolean, required: true},
    needRenovationResources: {type: Boolean, required: true},
    needFinancingAssistance: {type: Boolean, required: true},
    needFinancialAssistance: {type: Boolean, required: true},
    needFinancialCounseling: {type: Boolean, required: true},
    needEmploymentCounseling: {type: Boolean, required: true},
    soleHomeowner: {type: Boolean, required: true},
    oweBackTaxes: {type: Boolean, required: true},
    reverseMortgage: {type: Boolean, required: true},
    comfortableInCommunity: {type: Boolean, required: true},
    timeInCommunity: {type: String, required: true},
}, { timestamps: true });

const maintainCurrentHouse = mongoose.model('maintainCurrentHouse', maintainCurrentHouseSchema);
module.exports = maintainCurrentHouse;