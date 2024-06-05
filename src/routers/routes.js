const express = require('express');
const router = express.Router();
const AuthCostomerController = require('../controllers/authCostomerController');
const upload = require('../utils/multer');


//======================= authCostomerController =============================
router.post("/auth/customer/loginUser",AuthCostomerController.loginUser); 
router.post("/auth/customer/registerUser",upload.single('image'),AuthCostomerController.registerUser); 
module.exports = router;
