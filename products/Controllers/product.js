const productModel = require("../Models/product");
const nodemailer = require("nodemailer");
const{sendNotification }=require('../../utils/sendNotification');
const axios = require('axios');
let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "abrar.purpose@gmail.com",
    pass: "vjusorbiqjpjwhaz",
  },
});
const AddProduct = async (req, res) => {
  try {
    const requiredFields = [
      "name",
      "description",
      "hashtag",
      "price",
      "warranty",
      "therearechooses",
    ];
    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
    }
    var x = req.params.id ;
    // console.log(req.params.id); 
    const product = new productModel({
      video: `${req.files["video"][0].path}`,
      idVendor: x,
      name: `${req.body.name}`,
      img: `${req.files["img"][0].path}`,
      description: `${req.body.description}`,
      hashtag: `${req.body.hashtag}`,
      price: `${req.body.price}`,
      warranty: `${req.body.warranty}`,
      typeWarranty: `${req.body.typeWarranty}`,
      status: "Pending",
      therearechooses: `${req.body.therearechooses}`,
    });
    
    await product.save();

    res.status(200).json({
      message: "Added successfully",
      data: product,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "Add Product Failed",
      error: error.message,
    });
  }
};

const getAllproducts = async (req, res) => {
  try {
    let products = await productModel.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong on getting products",
    });
  }
};
const editProductStatus = async (req, res) => {
  try {
    const { productId, newStatus } = req.body;

    if (!productId || !newStatus) {
      throw new Error("Missing required fields: productId and newStatus");
    }
    if (newStatus === "Accepted") {
      const product = await productModel.findByIdAndUpdate(
        productId,
        {
          status: newStatus,
        },
        {
          new: true,
        }
      );
      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
  
      }
      const notificationData = {

        Description: "adding product status", 
        details: `admin accepted adding your product : ${product}`, 
      };
    const response = await axios.post('https://webhook.site/24853ab5-45c1-47a8-bc3f-d1a7b51d2b32',notificationData);
    // if (response.status === 200) {
    // res.status(200).json({"message":'your request sent to admins'});

    // } else {
    //   res.status(400).json("Error sending your request please try later ");

    // }     

      
      let mailDetails = {
        from: "abrar.purpose@gmail.com",
        to: `${req.params.vendorEmail}`,
        subject: "Accepted product",
        text: `Hi the Admins Accept your new product `,
      };
      mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
          console.log("Error Occurs");
          console.error(err);
          res.status(500).json(`${err}`);
        } else {
          res.status(200).json({
            message: "Product status updated successfully",
            data: product,
          });
        }
      });
    } else {
      await productModel.findByIdAndDelete(productId);

      const notificationData = {

        Description: "adding product status", 
        details: "admin rejected adding your product", 
      };
    const response = await axios.post('https://webhook.site/24853ab5-45c1-47a8-bc3f-d1a7b51d2b32',notificationData);

      let mailDetails = {
        from: "abrar.purpose@gmail.com",
        to: `${req.params.vendorEmail}`,
        subject: "Rejected product",
        text: `Hi the Admins Not Accept your new product `,
      };
      mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
          console.log("Error Occurs");
          console.error(err);
          res.status(500).json(`${err}`);
        } else {
          return res.status(200).json({
            message: "Product deleted successfully",
          });
        }
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Edit Product Status Failed",
      error: error,
    });
  }
};
const addReview = async (req, res) => {
  try {
    const { productId, userId, rating, reviewText } = req.body;
    const newReview = {
      userId,
      rating,
      reviewText,
    };
    const updatedReviews = await productModel.findByIdAndUpdate(
      productId,
      { $push: { reviews: newReview } },
      { new: true }
    );
    res
      .status(201)
      .json({ message: "Review added successfully", data: newReview });
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ message: "Failed to add review", error: error.message });
  }
};
const Addchoose = async (req, res) => {
  try {
    const productId = req.params.id;
    const newChoose = {
      namechoose: `${req.body.namechoose}`,
      pricetypechoose: `${req.body.pricetypechoose}`,
      color: `${req.body.color}`,
      pricechoose: `${req.body.pricechoose}`
        ? parseFloat(req.body.pricechoose)
        : null,
      img: `${req.file.path}`,
    };

    const updatedReviews = await productModel.findByIdAndUpdate(
      productId,
      { $push: { chooses: newChoose } },
      { new: true }
    );
    res
      .status(201)
      .json({ message: "Choose added successfully", data: newChoose });
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ message: "Failed to add Choose", error: error.message });
  }
};
const getproductsbyvendorid = async (req, res) => {
  try {
    const vendorId = req.params.id;
    const products = await productModel.find({ idVendor: vendorId });
    return res
      .status(200)
      .json({ message: "Products retrieved successfully", data: products });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to retrieve products", error: error.message });
  }
};

const getReviewsByVendorId = async (req, res) => {
  try {
    const vendorId = req.params.id;
    const productReviews = await productModel.find({ idVendor: vendorId });

    if (!productReviews.length) {
      return res
        .status(200)
        .json({ message: "No products found for this vendor" });
    }
    const filteredData = productReviews.map((product) => ({
      productId: product._id,
      reviews: product.reviews.map((review) => ({
        rating: review.rating,
        reviewText: review.reviewText,
        createdAt: review.createdAt,
        updatedAt: review.updatedAt,
      })),
    }));

    return res
      .status(200)
      .json({
        message: "Product reviews retrieved successfully",
        data: filteredData,
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
  
};
const getpendingproducts =async (req, res) => {
  try {
    const products =  await productModel.find({ status: "Pending" });
    res.status(200).json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Something went wrong on getting products",
    });
  }
}
const numberofproductwhichisnotpending = async (req, res) => {
  try {
    const products =  await productModel.find({ status: "Accepted" });
    res.status(200).json({Number_of_products :products.length});
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Something went wrong on getting products",
    });
  }
}

module.exports = {
  AddProduct,
  getAllproducts,
  editProductStatus,
  addReview,
  getproductsbyvendorid,
  getReviewsByVendorId,
  Addchoose,
  getpendingproducts,
  numberofproductwhichisnotpending
};
