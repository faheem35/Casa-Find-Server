

const users = require("../models/userModel")

const jwt = require("jsonwebtoken");


//login
exports.loginController = async (req,res)=>{
          console.log("Inside admin login controller");
          
          const {email,password}=req.body
          console.log(email,password);

          try{
                    const existingUser= await users.findOne({email: email,password, isAdmin: 1 })
                     if (!existingUser) {
            return res.status(400).json({ message: "No admin found" });
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
