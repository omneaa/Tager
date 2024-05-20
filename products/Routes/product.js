const express = require('express');
const {storage} = require('../../utils/cloudinary');
var router = express.Router();
<<<<<<< HEAD
const multer=require('multer')
const path = require('path');

var AddProduct  = require('../Controllers/product');
const fileFilter = (req, file, cb) => {
    let ext = path.extname(file.originalname);
    // consloe(ext)
    let allowedExtensions = ['.png', '.jpg', '.jpeg','.wmv','.mp4']; 
    if (!allowedExtensions.includes(ext.toLowerCase())) {
      return cb(new Error('Only images (png, jpg, jpeg)'), false);
    }
    cb(null, true);
  };
  
const upload = multer({ storage, fileFilter});
router.post('/',upload.fields([{ name: 'img', maxCount: 1 }, { name: 'video', maxCount: 1 }]),
 AddProduct);
=======
const multer=require('multer');
const bodyParser = require('body-parser');
bodyParser.json();
const upload = multer({storage});
var router = express.Router();
var AddProduct  = require('../Controllers/product');


router.post('/',upload.single('img'),AddProduct);
>>>>>>> be35595ee95971fa2295c81ca3b2c32465e356dd
module.exports = router;