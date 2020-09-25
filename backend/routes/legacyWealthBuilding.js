const router = require('express').Router();
let LegacyWealthBuilding = require('../models/legacyWealthBuilding.model');
const mongoose = require('mongoose');

//puts a new decision tree into DB 
router.route('/add').put((req,res) => {
    const caseID = mongoose.Types.ObjectId(req.body.caseID);
    const needHomeRenovation = req.body.needHomeRenovation;
    const wantToAttendWealthSeminar = req.body.wantToAttendWealthSeminar;
    const haveReverseMortgage = req.body.haveReverseMortgage;
    const needMortgageOrDeedTransfer = req.body.needMortgageOrDeedTransfer;
    const wantFirstTimeBuyersCourse = req.body.wantFirstTimeBuyersCourse;
    const needHealthyHomeInspection = req.body.needHealthyHomeInspection;
    const needEnergyEfficiencyInspection = req.body.needEnergyEfficiencyInspection;
    const planToAbandonHome = req.body.planToAbandonHome;
    const needFinancialAssistance = req.body.needFinancialAssistance;
    const needEmploymentAssistance = req.body.needEmploymentAssistance;
    const knowAboutHUDAssistance = req.body.knowAboutHUDAssistance;
    const haveOwnershipNeeds = req.body.haveOwnershipNeeds;
    const haveFamilySuccessivePlan = req.body.haveFamilySuccessivePlan;
    const needFinancialCounseling = req.body.needFinancialCounseling;

    const newLegacyDecisionTree = new LegacyWealthBuilding({
        caseID,
        needHomeRenovation,
        wantToAttendWealthSeminar,
        haveReverseMortgage,
        needMortgageOrDeedTransfer,
        wantFirstTimeBuyersCourse,
        needHealthyHomeInspection,
        needEnergyEfficiencyInspection,
        planToAbandonHome,
        needFinancialAssistance,
        needEmploymentAssistance,
        knowAboutHUDAssistance,
        haveOwnershipNeeds,
        haveFamilySuccessivePlan,
        needFinancialCounseling
    });

    newLegacyDecisionTree.save()
        .then(() => res.status(201).json('new legacy decision tree added'))
        .catch(err => res.status(400).json(err));
})

//get a decision tree based on the case id 
router.route('/').get((req, res) => {
    if (req.body.caseID) {
        LegacyWealthBuilding.find( {
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

    LegacyWealthBuilding.find()
    .then(cases => res.json(cases))
    .catch(err => res.status(400).json(err));
})

//get specific decision tree by case id 
router.route('/case/:id').get((req, res) => {
    if (req.params.id) {
        LegacyWealthBuilding.find( {
            caseID: mongoose.Types.ObjectId(req.params.id)
        }
        , function(err, docs) {
            if (err) {
                res.status(404).json(err)
            } else {
                res.status(200).json(docs)
            }
        })
    }

    LegacyWealthBuilding.find()
    .then(decisiontrees => res.json(decisiontrees))
    .catch(err => res.status(400).json(err));
})


//get specific decision tree by id 
router.route('/:id').get((req, res) => {
    LegacyWealthBuilding.findById(req.params.id, function (err, docs) { 
        if (err) { 
            console.log(err); 
        } 
        else { 
            res.json(docs)
        } 
    })
})

module.exports = router;