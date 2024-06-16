const express = require('express');
var router = express.Router();
var {AddCopon , getAllCopons , DeleteCopon , updateCopon} = require('../Controllers/copons');
router.post('/addcopon',AddCopon);
router.get('/allcopons',getAllCopons);
router.delete('/deletecopon/:id',DeleteCopon)
router.patch('/updatecopon/:id', updateCopon)
module.exports = router;