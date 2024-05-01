const express = require("express");
const router = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

router.post("/register", async(req, res) => {
  try {
    const userExists = await User.findOne({email: req.body.email});
    if(userExists){
        return res.status(200).send({message: "User already exists", success: false});
    }
    const password = req.body.password;
    const user  = await bcrypt.genSalt(10); //generate salt with 10 rounds
    const hashedPassword = await bcrypt.hash(password, salt); //hash password with salt
    req.body.password = hashedPassword; //replace plain password with hashed one
    const newUser = new User(req.body);
    await newUser.save();
    res.status(200).send({message: "User created successfully", success: true});
  } catch (error) {
    res.status(500).send({message: "Error creating user", success: false,error});
  }
});

router.post("/login", async (req, res) => {
  try {
  } catch (error) {}
});

module.exports = router;
