const express = require('express');
const upload = require('../../utils/multer');
var router = express.Router();
const {ValidateCode,SendCode}=require('../Controllers/vendor');
var ID;
router.post('/sendcode/:email',SendCode);

router.post('/validateCode/:code',ValidateCode);


module.exports = router;