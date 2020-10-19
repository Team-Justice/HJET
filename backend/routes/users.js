const router = require('express').Router();
let User = require('../models/user.model');

//add new user 
router.route('/add').post((req, res) => {
    //const caseId = mongoose.Types.ObjectId(req.body.caseId);
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const phoneNum = Number(req.body.phoneNum);
    const email = req.body.email;
    const password = req.body.password;
    const admin = Boolean(req.body.admin);

    const newUser = new User({
        firstName, 
        lastName,
        phoneNum,
        email,
        password,
        admin,
    }); 

    newUser.save()
        .then(() => res.status(201).json('new user added'))
        .catch(err => res.status(400).json(err));
});


module.exports = router;