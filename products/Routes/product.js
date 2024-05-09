const express = require('express');
const upload = require('../../utils/multer');
var router = express.Router();
var AddProduct  = require('../Controllers/product');
router.post('/',upload.single('img'),AddProduct);
module.exports = router;