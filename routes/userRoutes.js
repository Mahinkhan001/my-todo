const express=require('express')
const { registerController, loginController } = require('../controllers/userController');

//router obj
const router = express.Router()

//register
router.post('/register', registerController);

//login 
router.post('/login',loginController)

//export
module.exports=router;