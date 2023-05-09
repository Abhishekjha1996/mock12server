const express = require("express");
const userRoute = express.Router();
const { UserModel } = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


userRoute.post("/signup", async (req, res) => {
  const { email, password, confirmpassword } = req.body;

  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      const data = await UserModel.findOne({ email: email });
      if (data) {
        res.send({ msg: "user already Exists" });
      } else if (password !== confirmpassword) {
        res.send({ msg: "Mismatch password and confirmpassword" });
      } else {
        const user = new UserModel({
          email,
          password: hash,
          confirmpassword: hash,
        });

        await user.save();
        res.status(200).send({ msg: "signup done sucessfully" });
      }
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

userRoute.post("/login", async (req, res) => {
    const { email, password } = req.body;
      
    try {
        const user = await UserModel.findOne({email: email})
        
        if(user) {
            bcrypt.compare(password, user.password, (err, result)=> {
                if(result) {
                    res.status(200).send({"msg": "login sucessfully done", "token": jwt.sign({"userID": user._id}, "secretkey")})
                }else {
                    res.status(404).send({msg: "Invalid Credentials!"});
                }
            });
        }

  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = {
  userRoute,
};
