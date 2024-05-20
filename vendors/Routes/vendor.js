const express = require('express');
const {storage} = require('../../utils/cloudinary');
var router = express.Router();
const multer=require('multer');
const bodyParser = require('body-parser');
bodyParser.json();
const upload = multer({storage});
var router = express.Router();
const {ValidateCode,SendCode,NewVendor,NewVendorRequest,Logout,EditLogo,DeleteLogo,DeleteVendor,EditVendor,EditVendorRequest}=require('../Controllers/vendor');
var ID;
router.post('/send-code/:email',SendCode);

router.post('/validate-code/:code/:email',ValidateCode);

router.post('/new-vendor',upload.fields([{ name: 'AddedTaxFile', maxCount: 1 }, { name: 'LicenseFile', maxCount: 1 }]),NewVendor);

router.post('/new-vendor-request',upload.fields([{ name: 'AddedTaxFile', maxCount: 1 }, { name: 'LicenseFile', maxCount: 1 }]),NewVendorRequest);

router.put('/logo/:Id',upload.single('img'),EditLogo);

router.delete('/logo/:Id',DeleteLogo);

router.delete('/vendor/:Id',DeleteVendor);

router.patch('/vendor/:Id',upload.fields([{ name: 'AddedTaxFile', maxCount: 1 }, { name: 'LicenseFile', maxCount: 1 }]),EditVendor);

router.post('/edit-vendor-request/:Id',upload.fields([{ name: 'AddedTaxFile', maxCount: 1 }, { name: 'LicenseFile', maxCount: 1 }]),EditVendorRequest);

router.post('/logout',Logout);

module.exports = router;









