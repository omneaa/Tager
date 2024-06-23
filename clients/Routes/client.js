const express = require('express');
const {storage} = require('../../utils/cloudinary');
var router = express.Router();
const { login,logout,viewProductByProductId,ViewLowestPriceProducts,ViewHighestPriceProducts,ViewHighRatedProducts,AddVendorReview,
    ViewAllVendorReviews,IncreaseProductViews,ViewTrendingProducts,SearchByDescription,AddFavouriteProduct
}=require('../Controllers/client');
const multer=require('multer');
const bodyParser = require('body-parser');
const path = require('path');
const {auth} = require('../../middlewares/auth') ;

bodyParser.json();
var router = express.Router();

router.post('/login/:Email/:Password',login);
router.post('/logout',auth,logout);

router.get('/view-productByProductId/:id',viewProductByProductId);
router.get('/The-lowest-price',ViewLowestPriceProducts);
router.get('/The-highest-price',ViewHighestPriceProducts);
router.get('/high-rated-products',ViewHighRatedProducts);
router.get('/search-by-description/:description',SearchByDescription);
router.patch('/add-vendor-review',auth,AddVendorReview);
router.get('/view-vendor-reviews/:id',ViewAllVendorReviews);
router.patch('/increase-product-views/:id',IncreaseProductViews);
router.get('/all-trending-products',ViewTrendingProducts);

router.patch('/add-favourite-product/:productId/:clientId',AddFavouriteProduct);
router.patch('/remove-favourite-product/:productId');
router.get('/all-favourite-products');


module.exports = router;









