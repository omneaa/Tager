const coponModel = require ('../Models/copons');
const productModel = require("../../products/Models/product");
const AddCoponstoAllProducts = async (req, res) => {
  try {

    const newCopon = req.body;
    const copon = new coponModel(newCopon);
    await copon.save();

    // 4. Update all products to reference the newly created coupon
    await productModel.updateMany({}, { $push: { copons: copon._id } });

    res.status(200).json({
      message: 'Coupon added to all products successfully!',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error adding coupon to products!',
      error: error.message,
    });
  }
};
const AddCoponToSpacifcProducts = async (req, res) => {
  try {
    const newCopon = req.body;
    const copon = new coponModel(newCopon);
    await copon.save();
    const productIds = req.body.products; 
    if (productIds && productIds.length > 0) {
      // Validate product IDs (optional, depending on your requirements)
      // if (!Array.isArray(productIds) || productIds.some(id => !mongoose.Types.ObjectId.isValid(id))) {
      //   throw new Error('Invalid product IDs');
      // }

      // Update products with the provided IDs
      await productModel.updateMany({ _id: { $in: productIds } }, { $push: { copons: copon._id } });
    } 

    res.status(200).json({
      message: 'Coupon added to selected products successfully!',
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: 'Error adding coupon to products!',
      error: error.message,
    });
  }
};
  const getAllCopons = async (req, res) => {
    try {
      // Fetch all coupons from the database
      const copons = await coponModel.find();
  
      // Send a successful response with all coupons
      res.status(200).json({ message: 'Coupons retrieved successfully!', copons });
    } catch (error) {
      console.error('Error fetching coupons:', error.message);
      res.status(500).json({ message: 'Error fetching coupons:', error });
    }
  };
  const DeleteCopon = async (req, res) => {
    try {
      // Get the copon ID from the request parameters
      const coponId = req.params.id; // Assuming the copon ID is in the URL path
       console.log(coponId);
      const deletedCopon = await coponModel.findByIdAndDelete(coponId);
  
      if (!deletedCopon) {
        return res.status(404).json({ message: 'Coupon not found!' });
      }
  
      // Send a successful deletion response
      res.status(200).json({ message: 'Coupon deleted successfully!' });
    } catch (error) {
      console.error('Error deleting coupon:', error.message);
      res.status(500).json({ message: 'Error deleting coupon:', error });
    }
  };
  const updateCopon = async (req, res) => {
    try {
      const coponId = req.params.id; 
      const { coponName, code, type, discount, ...otherData } = req.body; 
      const updatedCopon = await coponModel.findByIdAndUpdate(coponId, {
        coponName,
        code,
        type,
        discount,
        ...otherData // Include other optional fields from the request body
      }, { new: true });  // Return the updated document
  
      // Check if the copon was found and updated
      if (!updatedCopon) {
        return res.status(404).json({ message: 'Coupon not found!' });
      }
  
      // Send a successful update response with the updated copon data
      res.status(200).json({ message: 'Coupon updated successfully!', coupon: updatedCopon });
    } catch (error) {
      console.error('Error updating coupon:', error.message);
      res.status(500).json({ message: 'Error updating coupon:', error });
    }
  };
  
module.exports =  {AddCoponstoAllProducts , getAllCopons , DeleteCopon , updateCopon  , AddCoponToSpacifcProducts}
