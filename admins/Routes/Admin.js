const express = require('express');
const {storage} = require('../../utils/cloudinary');
var router = express.Router();
const {NewEssay,DeleteEssay,AllEssays,EditEssay,NewVendorsRequests,EditVendorRequests 
,AddVendor,DeleteVendor,AllVendors,VendorProfile,SendMailToAllVendors,AddNewAdmin,AllAdmins,
DeleteAdmin,AdminLogin,AdminLogout,AddClient,DeleteClient,AllClients,SendMailToAllClients,ClientsNum,
AddNewSuperAdmin,AllSuperAdmins,DeleteSuperAdmin,EditAdmin,EditSuperAdmin,SuperAdminLogin
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

router.post('/new-admin/:adminId',auth,AddNewAdmin);
router.post('/new-super-admin/:adminId',auth,AddNewSuperAdmin);
//router.post('/new-super-admin',AddNewSuperAdmin);
router.post('/new-vendor/:adminId',auth,upload.fields([{ name: 'AddedTaxFile', maxCount: 1 }, { name: 'LicenseFile', maxCount: 1 }]),AddVendor);
router.delete('/vendor/:id/:adminId',auth,DeleteVendor);
//
router.get('/all-vendors',AllVendors);
router.get('/all-clients/:adminId',auth,AllClients);
router.get('/all-admins/:adminId',auth,AllAdmins);
router.get('/all-super-admins/:adminId',auth,AllSuperAdmins);

//
router.get('/vendor/:id',VendorProfile);
router.post('/new-client/:adminId',auth,AddClient);
router.post('/admin-login/:email/:password',AdminLogin);
router.post('/super-admin-login/:email/:password',SuperAdminLogin);
router.post('/admin-logout',auth,AdminLogout);
router.delete('/admin/:id/:adminId',auth,DeleteAdmin);
router.delete('/super-admin/:id/:adminId',auth,DeleteSuperAdmin);
router.delete('/client/:id/:adminId',auth,DeleteClient);
router.get('/clients-num/:adminId',auth,ClientsNum);
router.get('/new-vendors-requests/:adminId',auth,NewVendorsRequests);
router.get('/edit-vendors-requests/:adminId',auth,EditVendorRequests);
router.post('/essay/:adminId',auth,NewEssay);
router.get('/all-essays/:adminId',auth,AllEssays);
router.delete('/essay/:id/:adminId',auth,DeleteEssay);
router.patch('/essay/:id/:adminId',auth,EditEssay);
router.post('/send-mail-clients/:adminId',auth,SendMailToAllClients);
router.post('/send-mail-vendors/:adminId',auth,SendMailToAllVendors);
router.patch('/edit-admin/:adminId',auth,EditAdmin);
router.patch('/edit-superAdmin/:adminId',auth,EditSuperAdmin);



module.exports = router;









