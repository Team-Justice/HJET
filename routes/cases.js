const router = require('express').Router();
const auth = require('../auth');
let Case = require('../models/case.model');

//returns all of the cases or specified based on parameters 
router.route('/').get(auth, (req, res) => {
    if (req.body.firstName && req.body.lastName && req.body.homeAddress) {
        Case.find( {$and: [{firstName: req.body.firstName},
            {lastName: req.body.lastName},
            {homeAddress: {$regex: req.body.homeAddress, $options: 'i'}}]}
        , function(err, docs) {
            if (err) {
                res.status(404).json(err)
            } else {
                res.status(200).json(docs)
            }
        })
    } else if (req.body.firstName && req.body.lastName) {
        console.log('reached here');
        Case.find({$and: [
                {firstName: req.body.firstName},
                {lastName: req.body.lastName}]}
            , function (err, docs) {
            if (err) {
                res.status(404).json(err)
            } else {
                res.status(200).json(docs)
            }
        })
    } else if(req.body.firstName) {
        Case.find( {
            firstName: req.body.firstName
        }
        , function(err, docs) {
            if (err) {
                res.status(404).json(err)
            } else {
                res.status(200).json(docs)
            }
        })
    } else if(req.body.lastName) {
        Case.find( {
            lastName: req.body.lastName
        }
        , function(err, docs) {
            if (err) {
                res.status(404).json(err)
            } else {
                res.status(200).json(docs)
            }
        })
    } else if(req.body.homeAddress) {
        Case.find( {
            homeAddress: req.body.homeAddress
        }
        , function(err, docs) {
            if (err) {
                res.status(404).json(err)
            } else {
                res.status(200).json(docs)
            }
        })
    }

    Case.find()
    .then(cases => res.json(cases))
    .catch(err => res.status(400).json(err));
})

//add new case 
router.route('/add').post(auth, (req, res) => {
    //const caseId = mongoose.Types.ObjectId(req.body.caseId);
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const phoneNum = Number(req.body.phoneNum);
    const email = req.body.email;
    const homeAddress = req.body.homeAddress;
    const city = req.body.city;
    const state = req.body.state;
    const zip = req.body.zip;
    const gender = req.body.gender;
    const race = req.body.race;
    const ethnicity = req.body.ethnicity;
    const veteran = req.body.veteran;
    const accommodations = req.body.accommodations;
    const preHomeowner = req.body.preHomeowner;
    const ownershipOfHome = req.body.ownershipOfHome;
    const timeInHome = Number(req.body.timeInHome);
    const homeValue = Number(req.body.homeValue);
    const homeAge = Number(req.body.homeAge);
    const householdAdults = Number(req.body.householdAdults);
    const householdChildren = Number(req.body.householdChildren);
    const householdIncome = Number(req.body.householdIncome);
    const numBeds = Number(req.body.numBeds);
    const numBaths = Number(req.body.numBaths);
    const numSqFootage = Number(req.body.numSqFootage);
    const recentlyRenovated = Boolean(req.body.recentlyRenovated);
    const needRenovation = Boolean(req.body.needRenovation);
    const homeDescription = req.body.homeDescription;

    const newCase = new Case({
        firstName, 
        lastName,
        phoneNum,
        email,
        homeAddress, 
        city, 
        state, 
        zip,
        gender, 
        race, 
        ethnicity,

        veteran, 
        accommodations, 
        preHomeowner,
        ownershipOfHome,
        timeInHome,
        homeValue,
        homeAge,
        householdAdults,
        householdChildren,
        householdIncome, 
        numBeds,
        numBaths,
        numSqFootage,
        recentlyRenovated,
        needRenovation,
        homeDescription
    }); 

    newCase.save()
        .then(() => res.status(201).json('new case added'))
        .catch(err => res.status(400).json(err));
});

//get specific case by id 
router.route('/:id').get(auth, (req, res) => {
    Case.findById(req.params.id, function (err, docs) { 
        if (err) { 
            console.log(err); 
        } 
        else { 
            res.json(docs)
        } 
    })
})

// update
router.route('/update/:id').post(auth, (req, res) => {
    Case.findById(req.params.id)
        .then(outDatedCase => {
            outDatedCase.firstName = req.body.firstName;
            outDatedCase.lastName = req.body.lastName;
            outDatedCase.phoneNum = Number(req.body.phoneNum);
            outDatedCase.email = req.body.email;
            outDatedCase.homeAddress = req.body.homeAddress;
            outDatedCase.city = req.body.city;
            outDatedCase.state = req.body.state;
            outDatedCase.zip = req.body.zip;
            outDatedCase.gender = req.body.gender;
            outDatedCase.race = req.body.race;
            outDatedCase.ethnicity = req.body.ethnicity;
            outDatedCase.veteran = req.body.veteran;
            outDatedCase.accommodations = req.body.accommodations;
            outDatedCase.preHomeowner = req.body.preHomeowner;
            outDatedCase.ownershipOfHome = req.body.ownershipOfHome;
            outDatedCase.timeInHome = Number(req.body.timeInHome);
            outDatedCase.homeValue = Number(req.body.homeValue);
            outDatedCase.homeAge = Number(req.body.homeAge);
            outDatedCase.householdAdults = Number(req.body.householdAdults);
            outDatedCase.householdChildren = Number(req.body.householdChildren);
            outDatedCase.householdIncome = Number(req.body.householdIncome);
            outDatedCase.numBeds = Number(req.body.numBeds);
            outDatedCase.numBaths = Number(req.body.numBaths);
            outDatedCase.numSqFootage = Number(req.body.numSqFootage);
            outDatedCase.recentlyRenovated = Boolean(req.body.recentlyRenovated);
            outDatedCase.needRenovation = Boolean(req.body.needRenovation);
            outDatedCase.homeDescription = req.body.homeDescription;

            outDatedCase.save()
                .then(() => res.json('Case updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
});

//delete
router.route('/:id').delete(auth, (req, res) => {
    Case.findByIdAndDelete(req.params.id)
    .then(() => res.json('Case deleted'))
    .catch(err => res.status(400).json(err))
});

module.exports = router;