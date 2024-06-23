const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const Client=require('../../clients/Models/client');
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
const result= await Product.find().sort({price:1});
return res.status(200).json({"message":"lowest price products","product":result});
}

const ViewHighestPriceProducts=async(req,res)=>{
    const result= await Product.find().sort({price:-1});
    return res.status(200).json({"message":"highest price products","product":result});
    }


const ViewHighRatedProducts=async(req,res)=>{
    const result=await Product.find().sort({averageRating:-1})
    return res.status(200).json({"message":"high rated products","products":result});
}


const AddVendorReview=async(req,res)=>{
    try {
        const { vendorId, userId, rating, reviewText } = req.body;
         const vendor=await Vendor.findById(vendorId);
         const totalRating = Number(vendor.totalRating)+Number(rating);
         const averageRating = Number(totalRating)/((vendor.reviews.length+1));
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
      } catch (error) {
        console.error(error);
        res
          .status(400)
          .json({ message: "Failed to add review", error: error.message });
      }
}



const ViewAllVendorReviews=async(req,res)=>{
    try {
        const vendorId = req.params.id;
        const vendorReviews = await Vendor.findById(vendorId,{reviews:1,averageRating:1});
    
        return res
          .status(200)
          .json({
            message: "Product reviews retrieved successfully",
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
  return res.status(500).json({ message: "Error ", error: error.message});
}
}

const AddFavouriteProduct=async(req,res)=>{
  try{
    const {productId}=req.params;
    const ID={
      productId
    }
   result=await Client.findByIdAndUpdate(req.params.clientId,{$push:{FavouriteProducts:ID}});

  return res.status(200).json({ message: "product added to your favourite products"});
}
catch(e){
  console.log(e.error);
}

}


module.exports ={login,logout,viewProductByProductId,ViewLowestPriceProducts,ViewHighestPriceProducts,ViewHighRatedProducts,AddVendorReview
    ,ViewAllVendorReviews,IncreaseProductViews,ViewTrendingProducts,SearchByDescription,AddFavouriteProduct};