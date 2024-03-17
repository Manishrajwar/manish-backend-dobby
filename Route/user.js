// Import the required modules
const express = require("express")
const router = express.Router()

// Import the required controllers and middleware functions
const {
  login,
  signup,
   
} = require("../Controller/auth")

const {uploadImages ,getAllImages} = require("../Controller/ImageUpload")

const { auth } = require("../middleware/auth")

// Routes for Login, Signup

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

// Route for user login
router.post("/login", login)

// Route for user signup
router.post("/signup", signup)



// ********************************************************************************************************
//                                      UPload images 
// ********************************************************************************************************

router.post("/uplodImage" , auth, uploadImages);

router.get("/getAllImages" , auth , getAllImages);

// Export the router for use in the main application
module.exports = router