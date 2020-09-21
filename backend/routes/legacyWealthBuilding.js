const router = require('express').Router();
let LegacyWealthBuilding = require('../models/legacyWealthBuilding.model');
const mongoose = require('mongoose');

//puts a new decision tree into DB 
router.route('/add').put((req,res) => {
    const caseID = mongoose.Types.ObjectId(req.body.caseID);
    const needHomeRenovation = Boolean(req.body.needHomeRenovation);
    const wantToAttendWealthSeminar = Boolean(req.body.wantToAttendWealthSeminar);
    const haveReverseMortgage = Boolean(req.body.haveReverseMortgage);
    const needMortgageOrDeedTransfer = Boolean(req.body.needMortgageOrDeedTransfer);
    const wantFirstTimeBuyersCourse = Boolean(req.body.wantFirstTimeBuyersCourse);
    const needHealthyHomeInspection = Boolean(req.body.needHealthyHomeInspection);
    const needEnergyEfficiencyInspection = Boolean(req.body.needEnergyEfficiencyInspection);
    const planToAbandonHome = Boolean(req.body.planToAbandonHome);
    const needFinancialAssistance = Boolean(req.body.needFinancialAssistance);
    const needEmploymentAssistance = Boolean(req.body.needEmploymentAssistance);
    const knowAboutHUDAssistance = Boolean(req.body.knowAboutHUDAssistance);
    const haveOwnershipNeeds = Boolean(req.body.haveOwnershipNeeds);
    const haveFamilySuccessivePlan = Boolean(req.body.haveFamilySuccessivePlan);
    const needFinancialCounseling = Boolean(req.body.needFinancialCounseling);

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

module.exports = router;