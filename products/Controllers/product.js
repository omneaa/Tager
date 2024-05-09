const productModel = require('../Models/product');
const AddProduct =async (req,res)=>{
   var product = req.body ; 
   try{
    const newproduct = await productModel.create(product);
    res.json({data : newproduct , msg : 'Product created successfully'});
   }catch(error){
    res.json({error : "Error creating product"});
   }
}
module.exports = AddProduct;