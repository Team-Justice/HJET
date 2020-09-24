const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const legacyWealthBuildingSchema = new Schema({
    caseID: {type: mongoose.Types.ObjectId, required: true},
    needHomeRenovation: {type: Boolean, required: true},
    wantToAttendWealthSeminar: {type: Boolean, required: true},
    haveReverseMortgage: {type: Boolean, required: true},
    needMortgageOrDeedTransfer: {type: Boolean, required: true},
    wantFirstTimeBuyersCourse: {type: Boolean, required: true},
    needHealthyHomeInspection: {type: Boolean, required: true},
    needEnergyEfficiencyInspection: {type: Boolean, required: true},
    planToAbandonHome: {type: Boolean, required: true},
    needFinancialAssistance: {type: Boolean, required: true},
    needEmploymentAssistance: {type: Boolean, required: true},
    knowAboutHUDAssistance: {type: Boolean, required: true},
    haveOwnershipNeeds: {type: Boolean, required: true},
    haveFamilySuccessivePlan: {type: Boolean, required: true},
    needFinancialCounseling: {type: Boolean, required: true}
}, { timestamps: true });

const legacyWealthBuilding = mongoose.model('legacyWealthBuilding', legacyWealthBuildingSchema);
module.exports = legacyWealthBuilding;