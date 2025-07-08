const express = require('express')
const adminController = require('../controllers//adminController')
const jwtMiddleware=require('../middlewares/jwtMiddleware')
const multerMiddleware = require('../middlewares/multerMiddleware')


const router = new express.Router() 

// http://localhost:3000/adminlogin
router.post("/adminlogin", adminController.loginController);

// DELETE any property by ID (Admin)
router.delete('/admin/properties/:id/remove', jwtMiddleware, adminController.adminRemovePropertyController);

// PUT update any property by ID (Admin)
router.put('/admin/properties/:id/edit', jwtMiddleware, multerMiddleware.single('propertyImg'), adminController.adminEditPropertyController);

//userlist: http://localhost:3000/userlist
router.get('/admin/userlist',adminController.fetchUser)


//useredit: http://localhost:3000/useredit/id
router.patch('/admin/useredit/:id',adminController.editUser)



module.exports = router