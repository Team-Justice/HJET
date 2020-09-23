const router = require('express').Router();
let SellHouse = require('../models/sellHouse.model');
const mongoose = require('mongoose');

//add a new decision tree 
router.route('/add').put((req, res) => {
    const caseID = mongoose.Types.ObjectId(req.body.caseID);
    const wantHomeWealthGenerationCourse = req.body.wantHomeWealthGenerationCourse;
    const wantFirstTimeBuyersCourse = req.body.wantFirstTimeBuyersCourse;
    const wantToSellToInvestor = req.body.wantToSellToInvestor; 
    const wantToUseBroker = req.body.wantToUseBroker; 
    const needFinancialAssistance = req.body.needFinancialAssistance; 
    const needFinancialCounseling = req.body.needFinancialCounseling; 
    const needHomeRenovation = req.body.needHomeRenovation; 
    const needKnowledgeOfSellingOptions = req.body.needKnowledgeOfSellingOptions; 
    const needManagingAssistance = req.body.needManagingAssistance; 
    const needProfessionalCounselor = req.body.needProfessionalCounselor; 
    const needHealthyHomeInspection = req.body.needHealthyHomeInspection; 
    const needEnergyEfficiencyInspection = req.body.needEnergyEfficiencyInspection; 
    const oweBackTaxes = req.body.oweBackTaxes; 
    const usedHUDCounselor = req.body.usedHUDCounselor; 
    const sellingHouseReason = req.body.sellingHouseReason; 
    const familyWillingToTakeOver = req.body.familyWillingToTakeOver; 
    const haveReverseMortgage = req.body.haveReverseMortgage; 
    const houseDegradationBeyondRepair = req.body.houseDegradationBeyondRepair; 
    const needSignificantRepairs = req.body.needSignificantRepairs; 

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

//get specific decision tree by id 
router.route('/:id').get((req, res) => {
    SellHouse.findById(req.params.id, function (err, docs) { 
        if (err) { 
            console.log(err); 
        } 
        else { 
            res.json(docs)
        } 
    })
})

//get specific decision tree by case id 
router.route('/case/:id').get((req, res) => {
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