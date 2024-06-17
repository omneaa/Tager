const express = require('express');
var router = express.Router();

var getTheOrdersAccordingToFilters= require('../Controllers/orders');


router.get('/sorteddata',getTheOrdersAccordingToFilters) ; 
module.exports = router;