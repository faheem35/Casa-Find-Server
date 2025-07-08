// const mongoose = require('mongoose')

// const userSchema= new mongoose.Schema({
//           username:{
//                     type:String,
//                     required:true,
                    
//           },
//           email:{
//                     type:String,
//                     required:true,
//                     unique:true
//           },
//           password:{
//                     type:String,
//                     required:true
//           },
//           profilepic:{
//                     type:String
                    
//           },
//            isAdmin:{
//         type:Boolean,
//         default:false
//     },

// })

// const users= mongoose.model("users",userSchema)

// module.exports = users



const mongoose = require('mongoose');

const userSchema= new mongoose.Schema({
  username: { type:String, required:true },
  email: { type:String, required:true, unique:true },
  password: { type:String, required:true },
  profilepic: { type:String },
  isAdmin: { type:Boolean, default:false },

  bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'properties' }]  
});

const users= mongoose.model("users", userSchema);

module.exports = users;
