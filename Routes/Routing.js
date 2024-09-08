var nodemailer = require('nodemailer');
const express = require("express");

const jwt = require('jsonwebtoken');
KEY = "jwttokenkey";
JWT_SECRET = "secret-123";

const userController = require('../Controllers/myUser');
const { signup, login,forgotPassMail, resetPassword } = require('../Controllers/AuthController');
const { signupValidation, loginValidation, resetPasswordValidation } = require('../Middlewares/AuthValidation');
const userModel = require('../Models/userSchema');
const bcrypt = require("bcrypt");
const routing = express.Router();

routing.post('/login', loginValidation, login);
routing.post('/signup', signupValidation, signup);

// routing.post('/forgot-password', async (req, res) => {
//   const { email } = req.body;
//   if (email) {
//     const user = await userModel.findOne({ email });
//     if (user) {

//       let payload = { "id": user._id };
//       const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '5m' });

//       try {
//         var transporter = nodemailer.createTransport({
//           service: 'gmail',
//           auth: {
//             user: 'asifanasif800@gmail.com',
//             pass: 'lyql itxk vwyp ugtw'
//           }
//         });
//         var mailOptions = {
//           from: 'asifanasif800@gmail.com',
//           to: email,
//           subject: 'Reset Password',

//           html: `
//                         <p>Click on the following link to reset your password:</p>
//                          <a href="http://localhost:3000/resetPassword/${token}">http://localhost:3000/resetPassword/${token}</a>
//                         <p>The link will expire in 5 minutes.</p>
//                         <p>If you didn't request a password reset, please ignore this email.</p>`,

//         };
//         transporter.sendMail(mailOptions)


//         return res.status(200).json({ success: true, message: 'Password reset link sent' });

//       }
//       catch (err) {
//         console.log(err)

//       }
//     }
//     else {

//       return res.status(400).json({ success: false, message: "user not found" })

//     }
//   }

// })

routing.post('/forgot-password', forgotPassMail);




routing.put("/reset-password/:token", resetPasswordValidation, resetPassword);



module.exports = routing;
