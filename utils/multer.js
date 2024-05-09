const multer = require('multer');
const path = require('path');
const express=require('express');
const router=new express.Router();
router.use(express.urlencoded({extended: true}));
router.use(express.json())
module.exports = multer({
    storage: multer.diskStorage({}) ,
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname) ; 
        if (ext!== '.png' && ext!== '.jpg' && ext!== '.jpeg') {
            return cb(new Error('Only images are allowed') ,false);
        }
        cb(null, true)
    }
})