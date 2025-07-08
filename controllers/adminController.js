

const users = require("../models/userModel")
const properties = require('../models/propertyModel');


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

// Delete any property (Admin)
exports.adminRemovePropertyController = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await properties.findByIdAndDelete({ _id: id });
    if (!deleted) return res.status(404).json("Property not found");
    res.status(200).json(deleted);
  } catch (err) {
    console.error("Admin Delete Error:", err);
    res.status(500).json("Failed to delete property");
  }
};

// Edit any property (Admin)
exports.adminEditPropertyController = async (req, res) => {
  const { id } = req.params;
  const {
    title, description, price, type, status,
    address, city, state, country,
    contactName, contactNumber,
    bedroom, bathroom, squareFeet,
    propertyImg
  } = req.body;

  const reUploadPropertyImg = req.file ? req.file.filename : propertyImg;

  try {
    const updated = await properties.findByIdAndUpdate(
      { _id: id },
      {
        title, description, price, type, status,
        address, city, state, country,
        contactName, contactNumber,
        bedroom, bathroom, squareFeet,
        propertyImg: reUploadPropertyImg
      },
      { new: true }
    );
    if (!updated) return res.status(404).json("Property not found");
    res.status(200).json(updated);
  } catch (err) {
    console.error("Admin Edit Error:", err);
    res.status(500).json("Failed to update property");
  }
};

//all users (Admin)
exports.fetchUser = async (req, res) => {
    try {
        const allUsers = await users.find();
        console.log(allUsers);
        res.status(200).json({ message: 'Users fetched', allUsers });
    } catch (error) {
        console.error('Error while fetching users:', error.message);
        res.status(400).json({ message: 'Failed to fetch the users list' });
    }
};

//edit user (Admin)
exports.editUser = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
  
    try {
      const updatedUser = await users.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(400).json({ message: 'User not found or update failed' });
      }
  
      res.status(200).json({ message: 'User status updated', updatedUser });
    } catch (error) {
      console.error('Error while updating user status:', error.message);
      res.status(500).json({ message: 'Server Error: Unable to update user status' });
    }
  };




