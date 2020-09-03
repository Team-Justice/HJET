const router = require('express').Router();
let Case = require('../models/case.model');
var mongoose = require('mongoose');

//returns all of the cases or specified based on parameters 
router.route('/').get((req, res) => {
    if (req.body.firstname && req.body.lastname && req.body.address) {
        Case.find( {$and: [{firstname: req.body.firstname},
            {lastname: req.body.lastname},
            {address: {$regex: req.body.address, $options: 'i'}}]}
        , function(err, docs) {
            if (err) {
                res.status(404).json(err)
            } else {
                res.status(200).json(docs)
            }
        })
    } else if (req.body.firstname && req.body.lastname) {
        console.log('reached here');
        Case.find({$and: [
                {firstname: req.body.firstname},
                {lastname: req.body.lastname}]}
            , function (err, docs) {
            if (err) {
                res.status(404).json(err)
            } else {
                res.status(200).json(docs)
            }
        })
    } else if(req.body.firstname) {
        Case.find( {
            firstname: req.body.firstname
        }
        , function(err, docs) {
            if (err) {
                res.status(404).json(err)
            } else {
                res.status(200).json(docs)
            }
        })
    } else if(req.body.lastname) {
        Case.find( {
            lastname: req.body.lastname
        }
        , function(err, docs) {
            if (err) {
                res.status(404).json(err)
            } else {
                res.status(200).json(docs)
            }
        })
    } else if(req.body.address) {
        Case.find( {
            address: req.body.address
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
router.route('/add').post((req, res) => {
    //const caseId = mongoose.Types.ObjectId(req.body.caseId);
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const ethnicity = req.body.ethnicity;
    const gender = req.body.gender;
    const address = req.body.address;
    const city = req.body.city;
    const state = req.body.state;
    const zipcode = req.body.zipcode;
    const phonenumber = Number(req.body.phonenumber);
    const homedescription = req.body.homedescription;
    const own = Boolean(req.body.own);
    const rent = Boolean(req.body.rent);
    const residencystartdate = Date.parse(req.body.residencystartdate);
    const estimatedvalue = Number(req.body.estimatedvalue);
    const ageofhome = Number(req.body.ageofhome);
    const householdincome = Number(req.body.householdincome);
    const numberofadults = Number(req.body.numberofresidents.adults);
    const numberofchildren = Number(req.body.numberofresidents.children);
    const bedrooms = Number(req.body.bedrooms);
    const baths = Number(req.body.baths);
    const squarefootage = Number(req.body.squarefootage);
    const recentlyrenovated = Boolean(req.body.recentlyrenovated);
    const needsrenovation = Boolean(req.body.needsrenovation);
    const previoushomeowner = Boolean(req.body.previoushomeowner);
    const veteran = req.body.veteran;
    const accomodations = req.body.accomodations;

    const newCase = new Case({
        firstname, 
        lastname, 
        ethnicity, 
        gender, 
        address, 
        state,
        city,
        zipcode,
        phonenumber, 
        homedescription, 
        own, 
        rent, 
        residencystartdate, 
        estimatedvalue,
        ageofhome, 
        householdincome, 
        numberofresidents, 
        bedrooms, 
        baths, 
        squarefootage, 
        recentlyrenovated,
        needsrenovation, 
        previoushomeowner, 
        veteran, 
        accomodations}); 

    newCase.save()
        .then(() => res.status(201).json('new case added'))
        .catch(err => res.status(400).json(err));
});

//get specific case by id 
router.route('/:id').get((req, res) => {
    Case.findById(req.params.id, function (err, docs) { 
        if (err) { 
            console.log(err); 
        } 
        else{ 
            res.json(docs)
        } 
    })
})


//delete
router.route('/:id').delete((req, res) => {
    Case.findByIdAndDelete(req.params.id)
    .then(() => res.json('Case deleted'))
    .catch(err => res.status(400).json(err))
})

module.exports = router;