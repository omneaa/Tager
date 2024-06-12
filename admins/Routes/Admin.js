const express = require('express');
const {storage} = require('../../utils/cloudinary');
var router = express.Router();
const {NewEssay,DeleteEssay,AllEssays,EditEssay,NewVendorsRequests,EditVendorRequests}=require('../Controllers/Admin');
const multer=require('multer');
const bodyParser = require('body-parser');
const path = require('path');
const {auth} = require('../../middlewares/auth') ;
bodyParser.json();
var router = express.Router();


router.post('/new-admin/:email/:password');
router.post('/new-vendor');
router.post('/new-client');
router.post('/admin-login/:email/:password');
router.patch('/admin');
router.post('/logout');
router.delete('/admin/:id');
router.delete('/vendor/:id');
router.delete('/client/:id');
router.get('/clients-num');
router.get('/new-vendors-requests',NewVendorsRequests);
router.get('/edit-vendors-requests',EditVendorRequests);
router.post('/essay',NewEssay);
router.get('/all-essays',AllEssays);
router.delete('/essay/:id',DeleteEssay);
router.patch('/essay/:id',EditEssay);
router.post('/mail-clients');
router.post('/mail-vendors');




module.exports = router;









