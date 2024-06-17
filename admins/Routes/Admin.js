const express = require('express');
const {storage} = require('../../utils/cloudinary');
var router = express.Router();
const {NewEssay,DeleteEssay,AllEssays,EditEssay,NewVendorsRequests,EditVendorRequests 
,AddVendor,DeleteVendor,AllVendors,VendorProfile,SendMailToAllVendors,AddNewAdmin,AllAdmins,
DeleteAdmin,AdminLogin,AdminLogout
}=require('../Controllers/Admin');
const multer=require('multer');
const bodyParser = require('body-parser');
const path = require('path');
const {auth} = require('../../middlewares/auth') ;
bodyParser.json();
var router = express.Router();

const fileFilter = (req, file, cb) => {
    let ext = path.extname(file.originalname);
    // consloe(ext)
    let allowedExtensions = ['.png','.pdf','.jpg']; 
    if (!allowedExtensions.includes(ext.toLowerCase())) {
      return cb(new Error('Only allowed images png, pdf,jpg'), false);
    }
    cb(null, true);
  };
  const upload = multer({ storage, fileFilter});

router.post('/new-admin',AddNewAdmin);
router.post('/new-vendor',upload.fields([{ name: 'AddedTaxFile', maxCount: 1 }, { name: 'LicenseFile', maxCount: 1 }]),AddVendor);
router.delete('/vendor/:id',DeleteVendor);
router.get('/all-vendors',AllVendors);
router.get('/all-admins',AllAdmins);
router.get('/vendor/:id',VendorProfile);
router.post('/new-client');
router.post('/admin-login/:email/:password',AdminLogin);
router.patch('/admin');
router.post('/admin-logout',AdminLogout);
router.delete('/admin/:id',DeleteAdmin);
router.delete('/client/:id');
router.get('/clients-num');
router.get('/new-vendors-requests',NewVendorsRequests);
router.get('/edit-vendors-requests',EditVendorRequests);
router.post('/essay',NewEssay);
router.get('/all-essays',AllEssays);
router.delete('/essay/:id',DeleteEssay);
router.patch('/essay/:id',EditEssay);
router.post('/mail-clients');
router.post('/send-mail-vendors',SendMailToAllVendors);




module.exports = router;









