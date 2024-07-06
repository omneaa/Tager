const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const Client=require('../../clients/Models/client');
const Followers=require('../../clients/Models/followers');
const Product=require('../../products/Models/product')
const Vendor=require('../../vendors/Models/vendor');
let hashedPassword ;
const tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
const jwtSecretKey = process.env.SECRET;

const login=async(req,res)=> {
    try{
        let result=await Client.find({"Email":req.params.Email},{Password:1,_id:1});
        const found = JSON.stringify(result);
        if(found==="[]")
         {
            return res.status(400).json({"message":"this email not found"});
         }
            
        for (const [key, value] of Object.entries(result)) {
        let password=value.Password;
        let ID=value._id;
        let isPasswordValid = await bcrypt.compareSync("123",password);
        if(isPasswordValid){
            const data = {
                id:result._id,
                Email:result.Email
            };
            const token = jwt.sign(data, jwtSecretKey);
            return res.status(200).json({"message":"ok","JWT":token,"ClientID":ID});
    
        }
        else
        {
            return res.status(400).json({"message":"the password is wrong "});
        }
    }}
    catch(e){
        res.status(400).json({"error":e.error});
    }
}

const logout=async(req,res)=>{
    return res.status(200).json({"message":"ok"});
}
const viewProductByProductId=async(req,res)=>{
const result= await Product.findById(req.params.id);
return res.status(200).json({"message":"done","product":result});
}



const ViewLowestPriceProducts=async(req,res)=>{
const result= await Product.find({"status":"Accepted"}).sort({price:1});
return res.status(200).json({"message":"lowest price products","product":result});
}

const ViewHighestPriceProducts=async(req,res)=>{
    const result= await Product.find({"status":"Accepted"}).sort({price:-1});
    return res.status(200).json({"message":"highest price products","product":result});
    }


const ViewHighRatedProducts=async(req,res)=>{
    const result=await Product.find({"status":"Accepted"}).sort({averageRating:-1})
    return res.status(200).json({"message":"high rated products","products":result});
}


const AddVendorReview=async(req,res)=>{
    try {
        const { vendorId, userId, rating, reviewText } = req.body;
         const vendor=await Vendor.findById(vendorId);
         if(!vendor)
         {
          console.log("not found");
          return res.status(404).json({ message: "vendor not found"});
         }
         else
         {
         const totalRating = Number(vendor.totalRating)+Number(rating);
         const averageRating = ((Number(totalRating)/(5*(vendor.reviews.length+1))))*5;
        const newReview = {
          userId,
          rating,
          reviewText, 
        };
         
        const updatedReviews = await Vendor.findByIdAndUpdate(
          vendorId,
          { $push: { reviews: newReview }},{ new: true }
        );
    
        const updated = await Vendor.findByIdAndUpdate(
          vendorId,
          { $set: { "totalRating":totalRating,"averageRating":averageRating}},{ new: true }
        );
        
        res
          .status(201)
          .json({ message: "Review added successfully to vendor", data: updated});
      } }catch (error) {
        res
          .status(400)
          .json({ message: "Failed to add review", error: "vendor not found" });
      }
}



const ViewAllVendorReviews=async(req,res)=>{
    try {
        const vendorId = req.params.id;
        const vendorReviews = await Vendor.findById(vendorId,{reviews:1,averageRating:1});
    
        return res
          .status(200)
          .json({
            message: "vendor reviews retrieved successfully",
            data: vendorReviews,
          });
      } catch (error) {
        console.error(error);
        return res
          .status(500)
          .json({
            message: "Failed to retrieve product reviews",
            error: error.message,
          });
      }
      
}
const IncreaseProductViews=async(req,res)=>{
  try{
  const product=await Product.findById(req.params.id);
  const views=Number(product.views)+1;
  const result=await Product.findByIdAndUpdate(req.params.id,{"views":views},{new:true});
  return res.status(200).json({ message: "views increased", data:result});
  }
  catch(e){
    return res.status(500).json({ message: "Error ", error: error.message});
  }
}
const ViewTrendingProducts=async(req,res)=>{
  try{
const result=await Product.find().sort({"views":-1});
return res.status(200).json({ message: "trending views", products:result});
  }
  catch(e)
  {
    return res.status(500).json({ message: "Error ", error: error.message});
  }
}

const SearchByDescription=async(req,res)=>{
 try{
 const regex = new RegExp(req.params.description);
const result=await Product.find({ description: { $regex: regex } ,status:"Accepted"});
  return res.status(200).json({ message: "products with description", products:result});
}

catch(e){
  return res.status(500).json({ message: "Error ", error: e.message});
}
}

const AddFavouriteProduct=async(req,res)=>{
  try{
    const {productId}=req.params;
    const ID={
      productId
    }
   const result=await Client.findByIdAndUpdate(req.params.clientId,{$push:{FavouriteProducts:{ ProductId: productId }}},{new:true});

  return res.status(200).json({ message: "product added to your favourite products",result:result});
}
catch(e){
  return res.status(500).json({ message: "Error ", error: e.message});
}

}

const DeleteFavouriteProduct=async(req,res)=>{
  try{
    const {productId}=req.params;
    const ID={
      productId
    }                                                                      
  const result=await Client.findByIdAndUpdate(req.params.clientId,{$pull:{FavouriteProducts:{ ProductId: productId }}},{new:true});

  return res.status(200).json({ message: "product deleted from your favourite products",result:result});
}
catch(e){
  return res.status(500).json({ message: "Error ", error: e.message});
}

}




const GetAllFavouriteProducts = async (req, res) => {
  const clientId = req.params.clientId;
  const productDetails = [];
  try {
    const data = await Client.findById(clientId,{ FavouriteProducts: 1, _id: 0 });
    if (!data) {
      return res.status(404).json({ message: 'Client not found' });
    }
    const productIds = data.FavouriteProducts.map(product => product.ProductId);
    for (const productId of productIds) {
      let product=await Product.findById(productId,{__v:0});
      productDetails.push(product);
    }
    return res.status(200).json({
      message: "your favourite products",productDetails,
    });
  } catch (err) {
    console.error('Error fetching client or favorite products:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};



const FollowVendor=async(req,res)=>{
  try{
  const {vendorId}=req.params;
const ID={
  vendorId
}

let result=await Followers.findOneAndUpdate({"ClientId":req.params.clientId},{$push:{Followers:{ VendorId: vendorId }}},{new:true});
if(!result){
   return result=await Followers.create({"ClientId":req.params.clientId},{$push:{Followers:{ VendorId: vendorId }}});
}
else{
return res.status(200).json({ message: "now you follow new vendor",result:result});
}
  }
  catch(e){
    return res.status(500).json({ message: "Error ", error: e.message});
  }
}

const UnfollowVendor=async(req,res)=>{
  try{
    const {vendorId}=req.params;
    const ID={
      vendorId
    }                                                                      
  const result=await Followers.findOneAndUpdate({"ClientId":req.params.clientId},{$pull:{Followers:{ VendorId:vendorId }}},{new:true});

  return res.status(200).json({ message: "now you unfollwed vendor",result:result});
}
catch(e){
  return res.status(500).json({ message: "Error ", error: e.message});
}

}


module.exports ={login,logout,viewProductByProductId,ViewLowestPriceProducts,ViewHighestPriceProducts,ViewHighRatedProducts,AddVendorReview
    ,ViewAllVendorReviews,IncreaseProductViews,ViewTrendingProducts,SearchByDescription,AddFavouriteProduct,DeleteFavouriteProduct,GetAllFavouriteProducts,
    FollowVendor,UnfollowVendor
  };