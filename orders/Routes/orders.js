const express = require('express');
var router = express.Router();

var {getTheOrdersAccordingToFilters , getNumberoforders}= require('../Controllers/orders');


router.get('/sorteddata',getTheOrdersAccordingToFilters) ; 
router.get('/numberoforders',getNumberoforders) ;
module.exports = router;