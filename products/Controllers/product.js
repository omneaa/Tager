const productModel = require('../Models/product');
const AddProduct =async (req,res)=>{
   var product = req.body ; 
   const newproduct = await productModel.create(product);
   res.json({data : newproduct , msg : 'Product created successfully'});
}
module.exports = AddProduct;