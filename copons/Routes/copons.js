const express = require('express');
var router = express.Router();
var {AddCoponstoAllProducts , getAllCopons , DeleteCopon , updateCopon , AddCoponToSpacifcProducts} = require('../Controllers/copons');
router.post('/addcopon',AddCoponstoAllProducts);
router.get('/allcopons',getAllCopons);
router.delete('/deletecopon/:id',DeleteCopon)
router.patch('/updatecopon/:id', updateCopon)
router.post('/coponforselected' , AddCoponToSpacifcProducts)
module.exports = router;