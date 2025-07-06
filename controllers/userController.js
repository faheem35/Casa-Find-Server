const users = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

//register
exports.registerController=async(req,res)=>{
          console.log("inside register controller");
          console.log(req.body);
          const {username,email,password}=req.body 
          try{
                    const existingUser = await users.findOne({email})
                    if(existingUser){
                              res.status(406).json("Already existing user... Please login!!!")
                    }else{
                              const newUser= new users({
                                        username,
                                        email,
                                        password,
                                        profilepic:""
                              })
                              await newUser.save()
                              res.status(200).json(newUser)

                    }

          }catch(err){
                    res.status(401).json(err)
          }
          
          
          
}


//login
exports.loginController = async (req,res)=>{
          console.log("Inside user login controller");
          const {email,password}=req.body
          console.log(email,password);

          try{
                    const existingUser= await users.findOne({email,password})

                     if (!existingUser) {
            return res.status(400).json({ message: "User not found" });
        }

         if (existingUser.isAdmin) {
            return res.status(403).json({ message: "Admins are not allowed to log in from this portal" });
        }

                    if(existingUser){
                              const token = jwt.sign({userId:existingUser._id}, process.env.JWTPASSWORD)

                              res.status(200).json({user:existingUser, token})  
                    }else{
                              res.status(404).json("Incorrect Email/Password")
                    }

          }catch(err){
                    res.status(401).json(err)
          }
         
          
}         



