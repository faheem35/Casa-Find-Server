const express = require('express')
const adminController = require('../controllers//adminController')

const router = new express.Router() 

// http://localhost:3000/adminlogin
router.post("/adminlogin", adminController.loginController);


module.exports = router