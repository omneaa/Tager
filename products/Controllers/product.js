const productModel = require('../Models/product');

const AddProduct = async (req, res) => {
  try {

    const requiredFields = ['name', 'description', 'hashtag', 'price', 'warranty', 'therearechooses'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }
    const choosesArray = [];
    const numChooses = Object.keys(req.body)
      .filter(key => key.startsWith('chooses[')) // Filter keys starting with chooses[
      .map(key => parseInt(key.match(/chooses\[(\d+)\]/)[1], 10)) // Extract integer index using regex
      .reduce((maxIndex, currentIndex) => Math.max(maxIndex, currentIndex), 0); // Find max index

    for (let i = 0; i <= numChooses; i++) {
      choosesArray.push({
        namechoose: req.body[`chooses[${i}].namechoose`],
        pricetypechoose: req.body[`chooses[${i}].pricetypechoose`],
        pricechoose: req.body[`chooses[${i}].pricechoose`] ? parseFloat(req.body[`chooses[${i}].pricechoose`]) : null, // Handle optional pricechoose
        imgchoose: req.body[`chooses[${i}].imgchoose`],
      });
    }
    const product = new productModel({
      //  video :`${req.files['video'][0].path}` ,
      idVendor: `664a354669855d6c78baf126`,
      name: `${req.body.name}`,
      img: `${req.files['img'][0].path}`,
      description: `${req.body.description}`,
      hashtag: `${req.body.hashtag}`,
      price: `${req.body.price}`,
      warranty: `${req.body.warranty}`,
      typeWarranty: `${req.body.typeWarranty}`,
      status: "Pending",
      therearechooses: `${req.body.therearechooses}`,
      chooses: choosesArray,
    });
    // console.log('chooses data before saving:', product.chooses)
    // console.log(`${req.body.chooses[1].namechoose}`);
    await product.save();
    res.status(200).json({
      message: "Added successfully",
      data: product
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "Add Product Failed",
      error: error
    });
  }
};


const getAllproducts = async (req, res) => {
  try {
    let products = await productModel.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong on getting products"
    });
  }
}
const editProductStatus = async (req, res) => {
  try {
    const {
      productId,
      newStatus
    } = req.body; 

    if (!productId || !newStatus) {
      throw new Error('Missing required fields: productId and newStatus');
    }
    if (newStatus === 'Not Accepted') {
      await productModel.findByIdAndDelete(productId);
      return res.status(200).json({
        message: 'Product deleted successfully'
      });
    } 
      const product = await productModel.findByIdAndUpdate(
        productId, {
          status: newStatus
        }, {
          new: true
        } 
      );
    

    if (!product) {
      return res.status(404).json({
        message: 'Product not found'
      });
    }

    res.status(200).json({
      message: 'Product status updated successfully',
      data: product
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Edit Product Status Failed',
      error: error
    });
  }
};
module.exports = {
  AddProduct,
  getAllproducts,
  editProductStatus
};
