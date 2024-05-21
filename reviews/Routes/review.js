const express = require('express');
var router = express.Router();
var {addReview , getAllReviews} = require('../Controllers/review');

router.post('/addreview', addReview);
router.get('/allreviews', getAllReviews);
module.exports = router;