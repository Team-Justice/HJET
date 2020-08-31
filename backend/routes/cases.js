const router = require('express').Router();
let Case = require('../models/case.model');

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

    const newCase = new Case({
        firstname, 
        lastname, 
        ethinicity, 
        gender, 
        address, 
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
        else { 
            res.json(docs)
        } 
    })
})

// update
router.route('/update/:id').post((req, res) => {
    Case.findById(req.params.id)
        .then(outDatedCase => {
            outDatedCase.firstname = req.body.firstname;
            outDatedCase.lastname = req.body.lastname; 
            outDatedCase.ethinicity = req.body.ethinicity;
            outDatedCase.gender = req.body.gender; 
            outDatedCase.address = req.body.address;
            outDatedCase.phonenumber = Number(req.body.phonenumber); 
            outDatedCase.homedescription = req.body.homedescription; 
            outDatedCase.own = Boolean(req.body.own); 
            outDatedCase.rent = Boolean(req.body.rent);
            outDatedCase.residencystartdate = Date.parse(req.body.residencystartdate); 
            outDatedCase.estimatedvalue = Number(req.body.estimatedvalue);
            outDatedCase.ageofhome = Number(req.body.ageofhome);
            outDatedCase.householdincome = Number(req.body.householdincome); 
            outDatedCase.numberofresidents.adults = Number(req.body.numberofresidents.adults);
            outDatedCase.numberofresidents.children = Number(req.body.numberofresidents.children);
            outDatedCase.bedrooms = Number(req.body.bedrooms); 
            outDatedCase.baths = Number(req.body.baths); 
            outDatedCase.squarefootage = Number(req.body.squarefootage); 
            outDatedCase.recentlyrenovated = Boolean(req.body.recentlyrenovated);
            outDatedCase.needsrenovation = Boolean(req.body.needsrenovation);
            outDatedCase.previoushomeowner = Boolean(req.body.previoushomeowner); 
            outDatedCase.veteran = Boolean(req.body.veteran); 
            outDatedCase.accomodations = req.body.accomodations;

            outDatedCase.save()
                .then(() => res.json('Case updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
});

//delete
router.route('/:id').delete((req, res) => {
    Case.findByIdAndDelete(req.params.id)
    .then(() => res.json('Case deleted'))
    .catch(err => res.status(400).json(err))
})

module.exports = router;