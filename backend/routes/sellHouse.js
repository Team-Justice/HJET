const router = require('express').Router();
let SellHouse = require('../models/sellHouse.model');
const mongoose = require('mongoose');

//add a new decision tree 
router.route('/add').put((req, res) => {
    const caseID = mongoose.Types.ObjectId(req.body.caseID);
    const wantHomeWealthGenerationCourse = Boolean(req.body.wantHomeWealthGenerationCourse);
    const wantFirstTimeBuyersCourse = Boolean(req.body.wantFirstTimeBuyersCourse);
    const wantToSellToInvestor = Boolean(req.body.wantToSellToInvestor); 
    const wantToUseBroker = Boolean(req.body.wantToUseBroker); 
    const needFinancialAssistance = Boolean(req.body.needFinancialAssistance); 
    const needFinancialCounseling = Boolean(req.body.needFinancialCounseling); 
    const needHomeRenovation = Boolean(req.body.needHomeRenovation); 
    const needKnowledgeOfSellingOptions = Boolean(req.body.needKnowledgeOfSellingOptions); 
    const needManagingAssistance = Boolean(req.body.needManagingAssistance); 
    const needProfessionalCounselor = Boolean(req.body.needProfessionalCounselor); 
    const needHealthyHomeInspection = Boolean(req.body.needHealthyHomeInspection); 
    const needEnergyEfficiencyInspection = Boolean(req.body.needEnergyEfficiencyInspection); 
    const oweBackTaxes = Boolean(req.body.oweBackTaxes); 
    const usedHUDCounselor = Boolean(req.body.usedHUDCounselor); 
    const sellingHouseReason = req.body.sellingHouseReason; 
    const familyWillingToTakeOver = Boolean(req.body.familyWillingToTakeOver); 
    const haveReverseMortgage = Boolean(req.body.haveReverseMortgage); 
    const houseDegradationBeyondRepair = Boolean(req.body.houseDegradationBeyondRepair); 
    const needSignificantRepairs = Boolean(req.body.needSignificantRepairs); 

    const newSellHouseDecisionTree = new SellHouse({
        caseID,
        wantHomeWealthGenerationCourse,
        wantFirstTimeBuyersCourse,
        wantToSellToInvestor,
        wantToUseBroker,
        needFinancialAssistance,
        needFinancialCounseling,
        needHomeRenovation,
        needKnowledgeOfSellingOptions,
        needManagingAssistance,
        needProfessionalCounselor,
        needHealthyHomeInspection,
        needEnergyEfficiencyInspection,
        oweBackTaxes,
        usedHUDCounselor,
        sellingHouseReason,
        familyWillingToTakeOver,
        haveReverseMortgage,
        houseDegradationBeyondRepair,
        needSignificantRepairs
    })

    newSellHouseDecisionTree.save()
        .then(() => res.status(201).json('new sell house decision tree added'))
        .catch(err => res.status(400).json(err));
})

//get a decision tree based on the case id 
router.route('/').get((req, res) => {
    if (req.body.caseID) {
        SellHouse.find( {
            caseID: mongoose.Types.ObjectId(req.body.caseID)
        }
        , function(err, docs) {
            if (err) {
                res.status(404).json(err)
            } else {
                res.status(200).json(docs)
            }
        })
    }

    SellHouse.find()
    .then(cases => res.json(cases))
    .catch(err => res.status(400).json(err));
})

module.exports = router;