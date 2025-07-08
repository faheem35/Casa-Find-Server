// const properties= require('../models/propertyModel')



// // Add Property 
// exports.addPropertyController = async (req, res) => {
//   console.log("Inside addPropertyController");

//   const userId = req.userId;
//   console.log("User ID:", userId);

//   const {
//     title, description, price, type, status,
//     address, city, state, country,
//     contactName, contactNumber
//   } = req.body;

//   const propertyImg = req.file?.filename;
//   console.log(title, description, price, type, status, address, city, state, country, contactName, contactNumber, propertyImg);

  
//   if (!title || !description || !price || !type || !status ||
//       !address || !city || !state || !country ||
//       !contactName || !contactNumber || !propertyImg) {
//     return res.status(400).json("Please fill in all required fields.");
//   }

//   try {
     
//     const existingProperty = await properties.findOne({ title, address });

//     if (existingProperty) {
//       return res.status(406).json("Property already exists at this address.");
//     }

//     const newProperty = new properties({
//       title,
//       description,
//       price,
//       type,
//       status,
//       address,
//       city,
//       state,
//       country,
//       contactName,
//       contactNumber,
//       propertyImg,
//       userId
//     });

//     await newProperty.save();
//     res.status(200).json(newProperty);

//   } catch (err) {
//     console.error("Error adding property:", err);
//     res.status(500).json("Server error. Please try again.");
//   }
// };

// //get user properties-  need of authorization
// exports.userPropertyController =async (req,res)=>{

//           console.log("inside userPropertyController");
//          const userId = req.userId
//          try{
//                     const alluserProjects = await properties.find({userId})
//                     res.status(200).json(alluserProjects)

//           }catch(err){
//                     res.status(401).json(err)
//           }          
// }

// //removeProperty - need of authorization
// exports.removePropertyController=async(req,res)=>{
//           console.log("inside removePropertyController");
//           const {id}= req.params
//           try{
//                     const deleteProperty = await properties.findByIdAndDelete({_id:id})
//                     res.status(200).json(deleteProperty)

//           }catch(err){
//                     res.status(401).json(err)
//           }

          
// }

// // editProperty - need of authorization
// exports.editPropertyController = async (req, res) => {
//   console.log("inside editPropertyController");

//   const id = req.params.id;
//   const userId = req.userId;

//   const {
//     title, description, price, type, status,
//     address, city, state, country,
//     contactName, contactNumber, propertyImg
//   } = req.body;

//   const reUploadPropertyImg = req.file ? req.file.filename : propertyImg;

//   try {
//     const updatedProperty = await properties.findByIdAndUpdate(
//       { _id: id },
//       {
//         title,
//         description,
//         price,
//         type,
//         status,
//         address,
//         city,
//         state,
//         country,
//         contactName,
//         contactNumber,
//         propertyImg: reUploadPropertyImg,
//         userId
//       },
//       { new: true }
//     );


//     await updatedProperty.save();
//     res.status(200).json(updatedProperty);

//   } catch(err){
//                     res.status(401).json(err)
//           }  
// };



const properties = require('../models/propertyModel');

// Add Property 
exports.addPropertyController = async (req, res) => {
  console.log("Inside addPropertyController");

  const userId = req.userId;
  console.log("User ID:", userId);

  const {
    title, description, price, type, status,
    address, city, state, country,
    contactName, contactNumber,
    bedroom, bathroom, squareFeet
  } = req.body;

  const propertyImg = req.file?.filename;
  console.log(title, description, price, type, status, address, city, state, country, contactName, contactNumber, propertyImg, bedroom, bathroom, squareFeet);

  if (!title || !description || !price || !type || !status ||
      !address || !city || !state || !country ||
      !contactName || !contactNumber || !propertyImg ||
      bedroom == null || bathroom == null || squareFeet == null) {
    return res.status(400).json("Please fill in all required fields.");
  }

  try {
    const existingProperty = await properties.findOne({ title, address });

    if (existingProperty) {
      return res.status(406).json("Property already exists at this address.");
    }

    const newProperty = new properties({
      title,
      description,
      price,
      type,
      status,
      address,
      city,
      state,
      country,
      contactName,
      contactNumber,
      bedroom,
      bathroom,
      squareFeet,
      propertyImg,
      userId
    });

    await newProperty.save();
    res.status(200).json(newProperty);

  } catch (err) {
    console.error("Error adding property:", err);
    res.status(500).json("Server error. Please try again.");
  }
};

// Get user properties
exports.userPropertyController = async (req, res) => {
  console.log("inside userPropertyController");
  const userId = req.userId;
  try {
    const alluserProjects = await properties.find({ userId });
    res.status(200).json(alluserProjects);
  } catch (err) {
    res.status(401).json(err);
  }
};

// Remove Property
exports.removePropertyController = async (req, res) => {
  console.log("inside removePropertyController");
  const { id } = req.params;
  try {
    const deleteProperty = await properties.findByIdAndDelete({ _id: id });
    res.status(200).json(deleteProperty);
  } catch (err) {
    res.status(401).json(err);
  }
};

// Edit Property
exports.editPropertyController = async (req, res) => {
  console.log("inside editPropertyController");

  const id = req.params.id;
  const userId = req.userId;

  const {
    title, description, price, type, status,
    address, city, state, country,
    contactName, contactNumber,
    bedroom, bathroom, squareFeet,
    propertyImg
  } = req.body;

  const reUploadPropertyImg = req.file ? req.file.filename : propertyImg;

  try {
    const updatedProperty = await properties.findByIdAndUpdate(
      { _id: id },
      {
        title,
        description,
        price,
        type,
        status,
        address,
        city,
        state,
        country,
        contactName,
        contactNumber,
        bedroom,
        bathroom,
        squareFeet,
        propertyImg: reUploadPropertyImg,
        userId
      },
      { new: true }
    );

    await updatedProperty.save();
    res.status(200).json(updatedProperty);

  } catch (err) {
    res.status(401).json(err);
  }
};


//get all property-  need of authorization
exports.allPropertyController = async (req, res) => {
  const searchKey = req.query.search;
  console.log("inside allPropertyController");
  console.log("Search key:", searchKey);

  const query = searchKey
    ? {
        $or: [
          { city: { $regex: searchKey, $options: 'i' } },
          { state: { $regex: searchKey, $options: 'i' } },
          { type: { $regex: searchKey, $options: 'i' } }
        ]
      }
    : {};

  try {
    const allProperties = await properties.find(query);
    res.status(200).json(allProperties);
  } catch (err) {
    console.error("Error fetching properties:", err);
    res.status(500).json("Failed to fetch properties.");
  }
};


//get property details - need of authorization
exports.getPropertyDetails = async (req, res) => {
  const { id } = req.params

  try {
    const property = await properties.findById(id)

    if (!property) {
      return res.status(404).json({ message: "Property not found" })
    }

    res.status(200).json(property)

  } catch (error) {
    console.error("Error fetching property by ID:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}