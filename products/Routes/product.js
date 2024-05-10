const express = require('express');
var router = express.Router();
const { storage } = require('../../utils/cloudinary');
const multer = require('multer');
const upload = multer({ storage });

var AddProduct  = require('../Controllers/product');
router.post('/',upload.single('img'),AddProduct);
module.exports = router;