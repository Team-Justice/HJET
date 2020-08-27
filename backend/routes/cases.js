const router = require('express').Router();
let Case = require('../models/case.model');

//returns all of the cases
router.route('/').get((req, res) => {
    Case.find()
    .then(cases => res.json(cases))
    .catch(err => res.status(400).json(err));
})

router.route('/add').post((req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const ethinicity = req.body.ethinicity;
    const gender = req.body.gender;
    const address = req.body.address;
    const phonenumber = Number(req.body.phonenumber);
    const homedescription = req.body.homedescription;
    const own = Boolean(req.body.own);
    const rent = Boolean(req.body.rent);
    const residencystartdate = Date.parse(req.body.residencystartdate);
    const estimatedvalue = Number(req.body.estimatedvalue);
    const ageofhome = Number(req.body.ageofhome);
    const householdincome = Number(req.body.householdincome);
    const numberofresidents = {
        adults: Number(req.body.numberofresidents.adults),
        children: Number(req.body.numberofresidents.children),
    }
    const bedrooms = Number(req.body.bedrooms);
    const baths = Number(req.body.baths);
    const squarefootage = Number(req.body.squarefootage);
    const recentlyrenovated = Boolean(req.body.recentlyrenovated);
    const needsrenovation = Boolean(req.body.needsrenovation);
    const previoushomeowner = Boolean(req.body.previoushomeowner);
    const veteran = Boolean(req.body.veteran);
    const accomodations = req.body.accomodations;

    const newCase = new Case({firstname, lastname, ethinicity, gender, 
    address, phonenumber, homedescription, own, rent, residencystartdate, estimatedvalue, 
    ageofhome, householdincome, numberofresidents, bedrooms, baths, squarefootage, recentlyrenovated, 
    needsrenovation, previoushomeowner, veteran, accomodations}); 

    newCase.save()
        .then(() => res.status(201).json('new case added'))
        .catch(err => res.status(400).json(err));
});

module.exports = router;