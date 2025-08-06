const express = require('express') ;   //import exprss
const { testingController } = require('../controllers/testController');

//router object
const router = express.Router();

//routes
router.get('/', testingController);


//exporting router which i made

module.exports = router;