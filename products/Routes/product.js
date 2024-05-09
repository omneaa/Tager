const express = require('express');
var router = express.Router();
var AddProduct  = require('../Controllers/product');
router.post('/',AddProduct);
module.exports = router;