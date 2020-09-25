const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sellHouseSchema = new Schema({
    caseID: {type: mongoose.Types.ObjectId, required: true},
    type: {type: String, default: 'Sell House'},
    wantHomeWealthGenerationCourse: {type: Boolean, required: true},
    wantFirstTimeBuyersCourse: {type: Boolean, required: true},
    wantToSellToInvestor: {type: Boolean, required: true}, 
    wantToUseBroker: {type: Boolean, required: true},
    needFinancialAssistance: {type: Boolean, required: true},
    needFinancialCounseling: {type: Boolean, required: true},
    needHomeRenovation: {type: Boolean, required: true},
    needKnowledgeOfSellingOptions: {type: Boolean, required: true},
    needManagingAssistance: {type: Boolean, required: true},
    needProfessionalCounselor: {type: Boolean, required: true},
    needHealthyHomeInspection: {type: Boolean, required: true},
    needEnergyEfficiencyInspection: {type: Boolean, required: true},
    oweBackTaxes: {type: Boolean, required: true},
    usedHUDCounselor: {type: Boolean, required: true},
    sellingHouseReason: {type: String, trim: true, required: true},
    familyWillingToTakeOver: {type: Boolean, required: true},
    haveReverseMortgage: {type: Boolean, required: true},
    houseDegradationBeyondRepair: {type: Boolean, required: true},
    needSignificantRepairs: {type: Boolean, required: true}
}, { timestamps: true });

const sellHouse = mongoose.model('sellHouse', sellHouseSchema);
module.exports = sellHouse;