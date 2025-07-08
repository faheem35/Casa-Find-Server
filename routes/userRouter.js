const express = require('express')
const userController=require('../controllers/userController')
const propertyController=require('../controllers/propertyController')
const jwtMiddleware=require('../middlewares/jwtMiddleware')
const multerMiddleware = require('../middlewares/multerMiddleware')
const bookmarkController = require('../controllers/bookmarkController');

const router = new express.Router()

//register: http://localhost:3000/register
router.post('/register',userController.registerController)

//login: http://localhost:3000/login
router.post('/login',userController.loginController)

//add-project: http://localhost:3000/add-property
router.post('/add-property',jwtMiddleware,multerMiddleware.single('propertyImg'),propertyController.addPropertyController )

//user-property: http://localhost:3000/user-property
router.get('/user-property',jwtMiddleware,propertyController.userPropertyController )


//properties/id/remove: http://localhost:3000/properties/id/remove
router.delete('/properties/:id/remove',jwtMiddleware,propertyController.removePropertyController)


//properties/10/edit: http://localhost:3000/properties/id/edit
router.put('/properties/:id/edit',jwtMiddleware,multerMiddleware.single('propertyImg'),propertyController.editPropertyController)


//all-properties: http://localhost:3000/all-properties
router.get('/all-properties',jwtMiddleware,propertyController.allPropertyController )

//property details 
router.get('/properties/:id',jwtMiddleware, propertyController.getPropertyDetails)


// Add bookmark: POST /bookmark/:propertyId
router.post('/bookmark/:propertyId', jwtMiddleware, bookmarkController.addBookmark);

// Remove bookmark: DELETE /bookmark/:propertyId
router.delete('/bookmark/:propertyId', jwtMiddleware, bookmarkController.removeBookmark);

// Get bookmarks: GET /bookmark
router.get('/bookmark', jwtMiddleware, bookmarkController.getBookmarks);

//show bookmarked properties
router.get('/bookmark', jwtMiddleware, userController.getBookmarkedProperties);


module.exports = router