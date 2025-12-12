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
import express from 'express';
import { body, validationResult } from 'express-validator';
import User from '../models/Users.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fetchuser from '../middleware/fetchuser.js';

const router = express.Router();
const JWT_SECRET = 'your_jwt_secret'; // Replace with your actual JWT secret

// Route 1: Create a User using: POST "/api/auth/createuser". Doesn't require Auth
router.post('/createuser', [
    // body('username', 'Name must be at least 3 characters long').isLength({ min: 3 }),
    body('email', 'Invalid email').isEmail(),
    body('password', 'Password must be at least 5 characters long').isLength({ min: 5 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: 'Sorry a user with this email already exists' });
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ authtoken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured");
    }
});

// Route 2: Authenticate a User using: POST "/api/auth/login". No login required
router.post('/login', [
    body('email', 'Invalid email').isEmail(),
    body('password', 'Password can`t be blanked ').exists(),
], async (req, res) => {
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

// Route 3: Get a User's details using: GET "/api/auth/getuser". Login required
router.get('/getuser', fetchuser, async (req, res) => {
    try {
        let userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occured");
    }
});

// Route 4: get Data of all Users and their details as well :GET "/api/auth/getallUser" (For Admin Only)
router.get('/getallUser', fetchuser, async(req, res) =>{
    try{

        const currentUser = await User.findById(req.user.id);

        if(currentUser.userType !== 'admin'){
            return res.status(403).json({message:"Access Denied: You must be admin"});
        }


        const allUsers = await User.find({}).select("-password");

        if(allUsers.length === 0){
            return res.status(404).json({message:"No user currently available in database"});
        }
        res.json(allUsers);
    }
    catch(error){
        console.error(error.message);
        return res.status(500).send("Internal Server Error");
    }
})
export default router;