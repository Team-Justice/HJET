const router = require('express').Router();
let User = require('../models/user.model');
const bcrypt = require('bcrypt');
const auth = require("../middleware/auth");
const jwt = require('jsonwebtoken');

//add new user (similar to signing up)
router.route('/add').post(auth, async (req, res) => {
    try {
        //const caseId = mongoose.Types.ObjectId(req.body.caseId);
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const phoneNum = Number(req.body.phoneNum);
        const email = req.body.email;
        const password = req.body.password;
        const admin = (req.body.admin === true || req.body.admin === 'true') ? true : false;

        // Validating user info
        if(!email || !password || !firstName || !lastName || !phoneNum) { 
            return res.status(400).json({message: "All fields need to be entered."});
        }
        const existingUser = await User.findOne({email: email})
        if(existingUser) {
            return res.status(400).json({message: "Account with this email already exists."});
        }

        // Hashing password
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        
        // Adding user to db
        const newUser = new User({
            firstName, 
            lastName,
            phoneNum,
            email,
            password: passwordHash,
            admin,
        }); 
        newUser.save()
        .then(() => res.status(201).json('New user added.'))
        .catch(err => res.status(400).json(err));
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

// user login
router.route('/login').post( async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        // Validating user info
        if (!email || !password) {
            return res.status(400).json({message: "Email and password need to be entered."});
        }
        const user = await User.findOne({email: email});
        if (!user) { 
            return res.status(400).json({message: "No account with this email exists."});
        }

        // Match password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({message: "Invalid credentials."});
        }

        // Generate token
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        return res.json({
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                admin: user.admin
            }   
        });
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

// endpoint to check if token is valid
router.route('/tokenIsValid').post( async (req, res) => {
    try {
        const token = req.header("x-auth-token");
        if (!token) {
            return res.json(false);
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified) {
            return res.json(false);
        }

        const user = await User.findById(verified.id);
        if (!user) {
            return res.json(false);
        }

        return res.json(true);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/", auth, async (req, res) => {
    const user = await User.findById(req.user);
    res.json({
        displayName: user.displayName,
        id: user._id,
    });
});

module.exports = router;