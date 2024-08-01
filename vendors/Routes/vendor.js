const express = require('express');
const {storage} = require('../../utils/cloudinary');
var router = express.Router();
const multer=require('multer');
const bodyParser = require('body-parser');
const path = require('path');
const {auth} = require('../../middlewares/auth') ;
bodyParser.json();
var router = express.Router();
const {ValidateCode,SendCode,NewVendor,NewVendorRequest,Logout,EditLogo,DeleteLogo,DeleteVendor,EditVendor,EditVendorRequest
  ,NewVendorValidateCode,getNumberofvendors,EditVendorRequestWithoutPermission
  ,MessageOtp
}=require('../Controllers/vendor');
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

router.post('/validate-code/:code/:vendorEmail',ValidateCode);
router.post('/message-otp',MessageOtp);

router.post('/new-vendor/:Id/:email/:status',auth,NewVendor);
// EmailValidateCode

router.post('/new-vendor-validate-code/:code',NewVendorValidateCode);
router.post('/new-vendor-request',upload.fields([{ name: 'AddedTaxFile', maxCount: 1 }, { name: 'LicenseFile', maxCount: 1 }]),NewVendorRequest);

router.put('/logo/:Id',auth,upload2.single('img'),EditLogo);

router.delete('/logo/:Id',auth,DeleteLogo);

router.delete('/vendor/:Id',auth,DeleteVendor);

router.patch('/vendor/:Request_Id/:Status',
upload.fields([{ name: 'AddedTaxFile', maxCount: 1 }, { name: 'LicenseFile', maxCount: 1 }])
,EditVendor);

router.post('/edit-vendor-request/:Id',auth,upload.fields([{ name: 'AddedTaxFile', maxCount: 1 }, { name: 'LicenseFile', maxCount: 1 }]),EditVendorRequest);
router.post('/edit-vendor-request-nopermissin/:Id',EditVendorRequestWithoutPermission);

router.post('/logout',auth,Logout);
router.get('/numberofvendors' ,getNumberofvendors);
module.exports = router;









