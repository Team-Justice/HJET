const router = require('express').Router();
let MaintainCurrentHome = require('../models/maintainCurrentHome.model');
const mongoose = require('mongoose');

router.route('/add').put((req,res) => {
    const caseID = mongoose.Types.ObjectId(req.body.caseID);
    const needSignificantRepairs = Boolean(req.body.needSignificantRepairs);
    const needHealthyHomeAudit = Boolean(req.body.needHealthyHomeAudit);
    const needEnergyEfficiencyAudit = Boolean(req.body.needEnergyEfficiencyAudit);
    const needRenovationResources = Boolean(req.body.needRenovationResources);
    const needFinancialAssistance = Boolean(req.body.needFinancialAssistance);
    const needFinancingAssistance = Boolean(req.body.needFinancingAssistance);
    const needFinancialCounseling = Boolean(req.body.needFinancialCounseling);
    const needEmploymentCounseling = Boolean(req.body.needEmploymentCounseling);
    const soleHomeowner = Boolean(req.body.soleHomeowner);
    const oweBackTaxes = Boolean(req.body.oweBackTaxes);
    const reverseMortgage = Boolean(req.body.reverseMortgage);
    const comfortableInCommunity = Boolean(req.body.comfortableInCommunity);
    const timeInCommunity = req.body.comfortableInCommunity;
    
    const newMaintainCurrentHomeDecisionTree = new MaintainCurrentHome({
        caseID,
        needSignificantRepairs,
        needHealthyHomeAudit,
        needEnergyEfficiencyAudit,
        needRenovationResources,
        needFinancingAssistance,
        needFinancialAssistance,
        needFinancialCounseling,
        needEmploymentCounseling,
        soleHomeowner,
        oweBackTaxes,
        reverseMortgage,
        comfortableInCommunity,
        timeInCommunity
    });

    newMaintainCurrentHomeDecisionTree.save()
        .then(() => res.status(201).json('new maintain decision tree added'))
        .catch(err => res.status(400).json(err));
})

//get a decision tree based on the case id 
router.route('/').get((req, res) => {
    if (req.body.caseID) {
        MaintainCurrentHome.find( {
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

    MaintainCurrentHome.find()
    .then(cases => res.json(cases))
    .catch(err => res.status(400).json(err));
})

//get specific decision tree by case id 
router.route('/case/:id').get((req, res) => {
    if (req.params.id) {
        MaintainCurrentHome.find( {
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

    MaintainCurrentHome.find()
    .then(decisiontrees => res.json(decisiontrees))
    .catch(err => res.status(400).json(err));
})


//get specific decision tree by id 
router.route('/:id').get((req, res) => {
    MaintainCurrentHome.findById(req.params.id, function (err, docs) { 
        if (err) { 
            console.log(err); 
        } 
        else { 
            res.json(docs)
        } 
    })
})



module.exports = router;