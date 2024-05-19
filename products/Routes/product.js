const express = require('express');
const {storage} = require('../../utils/cloudinary');
var router = express.Router();
const multer=require('multer')
const upload = multer({storage})
var AddProduct  = require('../Controllers/product');
router.post('/',upload.single('img'),AddProduct);
module.exports = router;