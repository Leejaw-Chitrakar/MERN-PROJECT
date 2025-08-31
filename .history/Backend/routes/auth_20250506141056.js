// const express = require('express');
// const User = require('../models/Users')
// const router = express.Router();
// const { body , validationResult } = require('express-validator');

// Create a User using: POST "/api/auth/". Doesn't require Auth

// router.post('/', 

// router.post('/', [
//     body('name').isLength({min : 3}),
//     body('email').isEmail(),
//     body('password').isLength({min : 5}),
// ], (req, res) =>{
//     console.log(req.body);  
//     const user = User(req.body);
//     user.save();
//     const errors = validationResult(req);
//     if(!errors.isEmpty()){
//         return res.status(400).json({errors : errors.array()});
//     }   
// }) 
// module.exports = router
const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/Users')
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const fetchuser =require('../middleware/fetchuser')
const JWT_SECRET = 'your_jwt_secret'; // Replace with your actual JWT secret
//Route 1: Create a User using: POST "/api/auth/". Doesn't require Auth No login required
// router.post('/', (req, res) => {
router.post('/createuser', [
    body('name', 'Name must be at least 3 characters long').isLength({ min: 3 }),
    body('email', 'Invalid email').isEmail(),
    body('password', 'Password must be at least 5 characters long').isLength({ min: 5 }),
], async (req, res) => {
    //If there are errors, return bad request and the errors
    // const user = User(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {


        // Check whether the user with this email exists already
        let user = await User.findOne({ email: req.body.email });
        // console.log(user);
        if (user) {
            return res.status(400).json({ error: 'Sorry a user with this email already exists' });
        }// create a new user
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });
        // .then(user => res.json(user))
        // .catch(err => {console.log(err)
        // res.json({error:'Please enter a unique value',message: err.message})});
        // eslint-disable-next-line no-undef
        // res.json({ message: 'User registered successfully!' });
        // res.send(req.body);
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ authtoken });
        // console.log(jwtData);
        // res.json({"success": true, user });
    } catch (error) {// to catch any error that occurs during the process
        console.error(error.message);
        res.status(500).send("some error occured");
    }
});
//Route 2: Authenticate a User using: POST "/api/auth/login". No login required
router.post('/login', [
    body('email', 'Invalid email').isEmail(),
    body('password', 'Password can`t be blanked ').exists(),
], async (req, res) => {
    //If there are errors, return bad request and the errors
    // const user = User(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: `Please try to login with correct credentials` });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: `Please try to login with correct credentials` });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ authtoken });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occured");
    }
});

//Route 3: get a User detailed using: PUT "/api/auth/getuser". login required
router.post('/getuser', fetchuser ,async (req, res) => {
    try {
        let userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        // res.status(500).send("Internal server error occured");
    }
});


module.exports = router;
