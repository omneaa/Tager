const express = require('express');
const {productStorage} = require('../../utils/multer');
var router = express.Router();
var AddProduct  = require('../Controllers/product');
router.post('/',productStorage.single('img'),AddProduct);
module.exports = router;