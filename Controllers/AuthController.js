const mongoose = require("mongoose")
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');

const userModel = require('../Models/userSchema');
 JWT_SECRET = "secret-123";


const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(409)
        .json({ message: 'User is already exist, you can login', success: false });
    }

    const newUser = new userModel({ name, email, password });
    newUser.password = await bcrypt.hash(password, 10);
    await newUser.save();
    res.status(201)
      .json({
        message: "Signup successfully",
        success: true
      })
  }
  catch (err) {
    res.status(500)
      .json({
        message: "Internal server errror",
        success: false
      })
  }
}





const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    const errorMsg = 'Auth failed email or password is wrong';

    if (!user) {
      return res.status(403)
        .json({ message: errorMsg, success: false });
    }
    const isequal = await bcrypt.compare(
      req.body.password,
      String(user.password).trim()
    )
    console.log(isequal, "is equal")
    if (!isequal) {
      return res.status(401).json({ success: false, message: errorMsg });
    }
    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      JWT_SECRET,
      { expiresIn: '24h' }
    )

    res.status(200)
      .json({
        message: "Login Success",
        success: true,
        jwtToken,
        email,
        name: user.name
      })
  }
  catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }


}

const forgotPassMail = async (req, res) => {
  const { email } = req.body;
  // try {
  if (email) {
    const user = await userModel.findOne({ email });
    if (user) {

      let payload = { "id": user._id };
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '5m' });
      // sendMailFunction(email,token);

      try {
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'asifanasif800@gmail.com',
            pass: 'lyql itxk vwyp ugtw'
          }
        });
        var mailOptions = {
          from: 'asifanasif800@gmail.com',
          to: email,
          subject: 'Reset Password',

          html: `
                        <p>Click on the following link to reset your password:</p>
                         <a href="https://mernfront2-im0v.onrender.com/#/resetPassword/${token}">https://mernfront2-im0v.onrender.com/#/resetPassword/${token}</a>
                        <p>The link will expire in 5 minutes.</p>
                        <p>If you didn't request a password reset, please ignore this email.</p>`,

        };
        transporter.sendMail(mailOptions)
        // .then(resp => {
        //   console.log(resp.messageId,"resp")
        //   if(resp.messageId.trim() != ""){
        //     return res.status(200).json({success:true, message: 'Password reset link sent' }); 

        //   }
        // else{
        //   console.log(" expired")
        //   return res.json({ message: "Link expired" });
        // }
        // })

        return res.status(200).json({ success: true, message: 'Password reset link sent' });
        // transporter.sendMail(mailOptions, function (error, info) {
        //   if (error) {
        //     return res.json({ message: "error sending email" });
        //   } else {
        //     return res.json({ status: true, message: "email sent" });
        //   }
        // });
      }
      catch (err) {
        console.log(err)

      }
    }
    else {

      return res.status(400).json({ success: false, message: "user not found" })

    }
  }
}

const resetPassword = async (req, res) => {
  const Password = req.body.password;
  const { token } = req.params;



  const decodedToken = jwt.decode(req.params.token, true)
  console.log(decodedToken, "decoded token")
  const user = await userModel.findOne({ _id: decodedToken.id });
  console.log(user, "userrrrrr")
  // console.log(decodedToken.id,"result id")
  try {
    if (!user || user == null) {
      return res.status(401).json({ success: false, message: "no user found" });
    }
    else {
      jwt.verify(req.params.token, JWT_SECRET, async (err, result) => {
        console.log(result, "result")
        console.log(err, "err")
        try {
          if (err) {
            return res.status(400).send({ message: "Invalid token", success: false });
          }


          else {
            const hashedPass = await bcrypt.hash(Password, 10);

            console.log(hashedPass, "hased pass");

            const isSuccess = await userModel.findByIdAndUpdate(
              { _id: user._id }, {
              $set: {

                password: hashedPass,
              },

            })
            console.log(isSuccess, "is sucesss resp")
            if (isSuccess) {
              return res.status(200).json({
                success: true,
                message: "Password Changed Successfully",
              });

            }
          }
        } catch (err) {
          return res.status(401).send({ message: "Invalid tokenn", success: false });

        }

      });
    }
  } catch (err) {
    return res.status(401).json({ status: "no user", message: "no user found" });
  }
}


module.exports = {
  signup,
  login,
  forgotPassMail,
  resetPassword
}