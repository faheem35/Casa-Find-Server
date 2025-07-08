// const mongoose = require('mongoose');

// const propertySchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true
//   },
//   description: {
//     type: String,
//     required: true
//   },
//   price: {
//     type: Number,
//     required: true
//   },
//   type: {
//     type: String, // e.g., Apartment, Villa, Land
//     required: true
//   },
//   status: {
//     type: String, // e.g., For Sale, For Rent
//     required: true
//   },
//   address: {
//     type: String,
//     required: true
//   },
//   city: {
//     type: String,
//     required: true
//   },
//   state: {
//     type: String,
//     required: true
//   },
//   country: {
//     type: String,
//     required: true
//   },
//   contactName: {
//     type: String,
//     required: true
//   },
//   contactNumber: {
//     type: String,
//     required: true
//   },
//   propertyImg: {
//     type: String,
//     required: true
//   },
//   userId: {
//     type: String,
//     required: true
//   }
// }, {
//   timestamps: true // adds createdAt and updatedAt
// });

// const properties = mongoose.model("properties", propertySchema);

// module.exports = properties;



const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  type: {
    type: String, // e.g., Apartment, Villa, Land
    required: true
  },
  status: {
    type: String, // e.g., For Sale, For Rent
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  contactName: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  propertyImg: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  bedroom: {
    type: Number,
    required: true
  },
  bathroom: {
    type: Number,
    required: true
  },
  squareFeet: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

const properties = mongoose.model("properties", propertySchema);

module.exports = properties;

