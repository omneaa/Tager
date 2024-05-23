const express = require('express');
const {storage} = require('../../utils/cloudinary');
var router = express.Router();
const multer=require('multer')
const path = require('path');
const {auth} = require('../../middlewares/auth') ; 
var {AddProduct, getAllproducts ,editProductStatus, addReview , getproductsbyvendorid ,Addchoose, getReviewsByVendorId }  = require('../Controllers/product');
const fileFilter = (req, file, cb) => {
    let ext = path.extname(file.originalname);
    // consloe(ext)
    let allowedExtensions = ['.jpeg', '.png', '.jpg','.gif','.bmp','.tiff','.mov','.wmv','.flv','.webm','.webp','.mp4']; 
    if (!allowedExtensions.includes(ext.toLowerCase())) {
      return cb(new Error('Only images and Videos'), false);
    }
    
    cb(null, true);
  };
const upload = multer({ storage, fileFilter});
router.post('/add/:id',upload.fields([{ name: 'img', maxCount: 1 },
                      { name: 'video', maxCount: 1 }]),
 AddProduct);
router.patch('/choose/:id' , upload.single('img') , Addchoose) ; 
router.get('/getall', auth,getAllproducts);
router.patch('/editstatus/:vendorEmail',editProductStatus);
router.patch('/addreview' ,addReview) ;
router.get('/products/:id',auth,getproductsbyvendorid)
router.get('/reviews/:id',auth,getReviewsByVendorId)
module.exports = router;