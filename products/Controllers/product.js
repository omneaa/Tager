const productModel = require('../Models/product');
const cloudinary = require('../../utils/cloudinary');
// const uplooad = require('../../utils/multer');
const AddProduct = async (req, res) => {
   try {
      console.log(req.body)
      const result = await cloudinary.uploader.upload(req.file.path)
      res.json(result);
   } catch (error) {
      res.json({ error: 'Error creating product' });
   }
};

module.exports = AddProduct;