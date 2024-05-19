const productModel = require('../Models/product');

const AddProduct = async (req, res) => {
   try {
      
      res.json(req.file.path);
   } catch (error) {
      res.json({ error: 'Error creating product' });
   }
};

module.exports = AddProduct;