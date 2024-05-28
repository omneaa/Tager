const express = require('express');
const {storage} = require('../../utils/cloudinary');
var router = express.Router();
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
router.get('/new-vendors-requests');
router.get('/edit-vendors-request');
router.post('/essay');
router.get('/all-essays');
router.delete('/essay/:id');
router.patch('/essay/:id');
router.post('/mail-clients');
router.post('/mail-vendors');




module.exports = router;









