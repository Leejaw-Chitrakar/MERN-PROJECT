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
    body('name', 'Name must be at least 3 characters long').isLength({ min: 3 }),
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

// Route 2: Authenticate a User using: POST "/api/auth/login". No login