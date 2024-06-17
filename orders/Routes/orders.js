const express = require('express');
var router = express.Router();

var {getallOrders,getTheDataSortedByDate} = require('../Controllers/orders');

router.get('/getallorders', getallOrders);
router.get('/sorteddata',getTheDataSortedByDate) ; 
module.exports = router;