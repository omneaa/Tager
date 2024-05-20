const express = require('express');
const {storage} = require('../../utils/cloudinary');
var router = express.Router();
const multer=require('multer');
const bodyParser = require('body-parser');
bodyParser.json();
const upload = multer({storage});
var router = express.Router();
var AddProduct  = require('../Controllers/product');


router.post('/',upload.single('img'),AddProduct);
module.exports = router;