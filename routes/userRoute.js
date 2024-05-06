//api function opertions
const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authmiddleware");

// whenever the end point is called from the client the function here will be exected.
// str is end point then callback finction its str will be try catch block coz we are using async. for all the mongdb concenp we will use await for function to call

router.post("/register", async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res
        .status(200)
        .send({ message: "User Already Exists", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newuser = new User(req.body);
    await newuser.save();
    res
      .status(200)
      .send({ message: "User Created Sucessfully", success: true });
  } catch (error) {
    console.log(error);

    res
      .status(500)
      .send({ message: "Error Creating User", success: false, error });
  }
});

router.post("/login", async (req, res) => {
  try {
    // first we will find the email if there is no email then no login, errmsg will be poped we no check the password
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: " User does not exist.", success: false });
    }
    // comparing encrpted password with the normal password here await bcrypt.compare(user_input_normal-password, encrpted_password)
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: " Password is incorrect", success: false });
    } else {
      // jwt.sign will generte the token ;first paramenter will be idie payload the it will be secret key; every they need to login token will be expired in 1 day
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res
        .status(200)
        .send({ message: "Login successful", success: true, data: token });
    }
  } catch (error) {
    console.log(error);

    res
      .status(500)
      .send({ message: "Error Logging in", success: false, error });
  }
});

// token valid then only we will send the response to the frontend
// in this end point we r going to send email and user to the user after the successfull login
router.post('/get-user-info-by-id', authMiddleware ,async(req,res)=>{
  // every time they will only send one thing that the token to the backend
  try {
    const user = await User.findById({_id: req.body.userId});
    if(!user){
      return res.status(200).send({message: "User does not exist", success: false});
    }
    else{
      res.status(200).send({success: true, data:{
        name: user.name,
        email: user.email,
      } });
    }
  } catch (error) {
    res.status(500)
    .send({message: "Error getting user info", success: false, error});
  } 
})
module.exports = router;
