const express = require('express');
<<<<<<< HEAD
const {productStorage} = require('../../utils/multer');
=======
>>>>>>> 00f9142f15989a13f96f81769e15cc10d2667e90
var router = express.Router();
const { storage } = require('../../utils/cloudinary');
const multer = require('multer');
const upload = multer({ storage });

var AddProduct  = require('../Controllers/product');
router.post('/',productStorage.single('img'),AddProduct);
module.exports = router;