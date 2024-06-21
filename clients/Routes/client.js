const express = require('express');
const {storage} = require('../../utils/cloudinary');
var router = express.Router();
const { login
}=require('../Controllers/client');
const multer=require('multer');
const bodyParser = require('body-parser');
const path = require('path');
const {auth} = require('../../middlewares/auth') ;

bodyParser.json();
var router = express.Router();

router.post('/login/:Email/:Password',login);
router.post('/sign-up');



module.exports = router;









