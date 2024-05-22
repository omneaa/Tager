const express = require('express');
const {storage} = require('../../utils/cloudinary');
var router = express.Router();
const multer=require('multer');
const bodyParser = require('body-parser');
const path = require('path');
bodyParser.json();
var router = express.Router();
const {ValidateCode,SendCode,NewVendor,NewVendorRequest,Logout,EditLogo,DeleteLogo,DeleteVendor,EditVendor,EditVendorRequest}=require('../Controllers/vendor');
var ID;




const fileFilter = (req, file, cb) => {
    let ext = path.extname(file.originalname);
    // consloe(ext)
    let allowedExtensions = ['.png','.pdf','.jpg']; 
    if (!allowedExtensions.includes(ext.toLowerCase())) {
      return cb(new Error('Only allowed images png, pdf,jpg'), false);
    }
    cb(null, true);
  };
  
const fileFilter2 = (req, file, cb) => {
    let ext = path.extname(file.originalname);
    // consloe(ext)
    let allowedExtensions = ['.png','.jpg']; 
    if (!allowedExtensions.includes(ext.toLowerCase())) {
      return cb(new Error('Only allowed images png, pdf,jpg'), false);
    }
    cb(null, true);
  };


const upload = multer({ storage, fileFilter});
const upload2 = multer({ storage, fileFilter2});



router.post('/send-code/:email',SendCode);

router.post('/validate-code/:code/:email',ValidateCode);

router.post('/new-vendor/:Id/:email/:status',NewVendor);

router.post('/new-vendor-request',upload.fields([{ name: 'AddedTaxFile', maxCount: 1 }, { name: 'LicenseFile', maxCount: 1 }]),NewVendorRequest);

router.put('/logo/:Id',upload2.single('img'),EditLogo);

router.delete('/logo/:Id',DeleteLogo);

router.delete('/vendor/:Id',DeleteVendor);

router.patch('/vendor/:Id',upload.fields([{ name: 'AddedTaxFile', maxCount: 1 }, { name: 'LicenseFile', maxCount: 1 }]),EditVendor);

router.post('/edit-vendor-request/:Id',upload.fields([{ name: 'AddedTaxFile', maxCount: 1 }, { name: 'LicenseFile', maxCount: 1 }]),EditVendorRequest);

router.post('/logout',Logout);

module.exports = router;









