const express = require('express');
const {storage} = require('../../utils/cloudinary');
var router = express.Router();
const multer=require('multer')
const path = require('path');

var {AddProduct, getAllproducts ,editProductStatus, addReview , getproductsbyvendorid , getReviewsByVendorId }  = require('../Controllers/product');
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
router.post('/add',upload.fields([{ name: 'img', maxCount: 1 }, { name: 'video', maxCount: 1 }]),
 AddProduct);

router.get('/getall',getAllproducts);
router.patch('/editstatus',editProductStatus);
router.patch('/addreview', addReview) ;
router.get('/products/:id',getproductsbyvendorid)
router.get('/reviews/:id',getReviewsByVendorId)
module.exports = router;