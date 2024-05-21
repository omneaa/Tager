const express = require('express');
var router = express.Router();

var getallOrders = require('../Controllers/orders');

router.get('/getallorders', getallOrders);
module.exports = router;