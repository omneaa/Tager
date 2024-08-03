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
    console.log(req.body.typeWarranty[0]); 
    console.log(req.body.typeWarranty[1]);  
    console.log(req.body.typeWarranty[2]);
    arraytypewarranty=[] ;
    if (req.body.typeWarranty[0] != undefined) {
    arraytypewarranty.push(req.body.typeWarranty[0]);}
    if (req.body.typeWarranty[1] != undefined) { 
    arraytypewarranty.push(req.body.typeWarranty[1]);
  }
   if (req.body.typeWarranty[2] != undefined){
    arraytypewarranty.push(req.body.typeWarranty[2]);
   }
    const product = new productModel({
      video: `${req.files["video"][0].path}`,
      idVendor: x,
      name: `${req.body.name}`,
      img: `${req.files["img"][0].path}`,
      description: `${req.body.description}`,
      hashtag: `${req.body.hashtag}`,
      price: `${req.body.price}`,
      warranty: `${req.body.warranty}`,
      typeWarranty: arraytypewarranty ,
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
    let products = await productModel.find({"status":"Accepted"});
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
    const product=await productModel.findById(productId);
    const totalRating = Number(product.totalRating)+Number(rating);
    const averageRating = (Number(totalRating)/(5*(product.reviews.length+1)))*5;
    const newReview = {
     
      userId,
      rating,
      reviewText, 
    };
     
    const updatedReviews = await productModel.findByIdAndUpdate(
      productId,
      { $push: { reviews: newReview }},{ new: true }
    );

    const updated = await productModel.findByIdAndUpdate(
      productId,
      { $set: { "totalRating":totalRating,"averageRating":averageRating}},{ new: true }
    );
    
    res
      .status(201)
      .json({ message: "Review added successfully", data: updated});
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ message: "Failed to add review", error: error.message });
  }
};
const addComment = async (req, res) => {
  try {
    const productId = req.params.id;
    const {client , comment} = req.body;
     const product=await productModel.findById(productId);
    const newComment = {
      client , 
      comment 
    };
     
    const updatedComments = await productModel.findByIdAndUpdate(
      productId,
      { $push: { comments: newComment }},{ new: true }
    );

    const updated = await productModel.findByIdAndUpdate(
      productId,
     { new: true }
    );
    
    res
      .status(201)
      .json({ message: "Comment added successfully", data: updated});
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ message: "Failed to add Comment", error: error.message });
  }
};

const Addchoose = async (req, res) => {
  try {
    const productId = req.params.id;
    const newChoose = {
      namechoose: `${req.body.namechoose}`,
      pricetypechoose: `${req.body.pricetypechoose}`,
      typeOfChoose: `${req.body.typeOfChoose}`,
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
    console.log(vendorId);
    const products = await productModel.find({ idVendor: vendorId });
    console.log(products);
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
const getproductSortedbyCreatedDate = async (req, res) =>{
  try {
    const products =  await productModel.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Something went wrong on getting products",
    });
  }
}
const shareproductbyLink=async (req, res) =>{
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const url = `https://tager.onrender.com/products/product/${product._id}`;
    res.status(200).json({ message: "Product link shared successfully", link: url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to share product", error: error.message });
  }
}
const getProductByid=async (req,res) =>{
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get product", error: error.message });
  }
}
const addReply = async (req, res) => {
  try {
    const { productId, commentId, user, reply } = req.body;
    console.log(productId , " " , commentId);
    // Find the product
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Find the comment to reply to
    const comment = product.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Create the reply
    const newReply = {
      user,
      reply,
      createdAt: Date.now()
    };

    // Add the reply to the comment's replies array
    comment.replies.push(newReply);

    // Save the updated product
    await product.save();

    res.status(201).json({ message: 'Reply added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error adding reply' });
  }
};

const deletecomment  = async (req, res) => {
  try {
    const productId = req.params.pId;
    const commentId = req.params.cId;

    // Find the product
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Find the comment within the product's comments array
    const commentIndex = product.comments.findIndex(c => c._id.toString() === commentId);
    if (commentIndex === -1) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Remove the comment from the array
    product.comments.splice(commentIndex, 1);

    // Save the updated product
    await product.save();

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting comment' });
  }
};
const EditComment= async (req,res) => {
  try {
    const productId = req.params.pId;
    const commentId = req.params.cId;
    const newCommentText = req.body.newCommentText;
    // Find the product 
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    // Find the comment within the product's comments array
    const commentIndex = product.comments.findIndex(c => c._id.toString() === commentId);
    if (commentIndex === -1) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    // Update the comment text
    product.comments[commentIndex].comment= newCommentText;
    // Save the updated product
    await product.save();
    res.status(200).json({ message: 'Comment updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error editing comment' });
  }
}
const deleteReply = async (req, res) => {
  try {
    const productId = req.params.pId;
    const commentId = req.params.cId;
    const replyId = req.params.rId;

    // Find the product
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Find the comment
    const comment = product.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Find the reply index
    const replyIndex = comment.replies.findIndex(reply => reply._id.toString() === replyId);
    if (replyIndex === -1) {
      return res.status(404).json({ message: 'Reply not found' });
    }

    // Remove the reply
    comment.replies.splice(replyIndex, 1);

    // Save the updated product
    await product.save();

    res.status(200).json({ message: 'Reply deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting reply' });
  }
};
const EditReply = async(req, res) => {
  try {
    const productId = req.params.pId;
    const commentId = req.params.cId;
    const replyId = req.params.rId;
    const newReplyText = req.body.newReplyText;
    // Find the product
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    // Find the comment
    const comment = product.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    // Find the reply index
    const replyIndex = comment.replies.findIndex(reply => reply._id.toString() === replyId);
    if (replyIndex === -1) {
      return res.status(404).json({ message: 'Reply not found' });
    }
    // Update the reply text
    comment.replies[replyIndex].reply = newReplyText;
    // Save the updated product
    await product.save();
    res.status(200).json({ message: 'Reply updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error editing reply' });
  }
}
const DeleteProduct =async (req, res) => {
  try {
    const productId = req.params.id;
    // Find the product and remove it
    // find the product first 
   // console.log(productId);
    const product = await productModel.findByIdAndDelete(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting product' });
  }
}
// here Omniaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
// get all reviews by user is  => get to his reviews list 
const getallreviewsbyuserid= async (req, res) => {
  // try {
  //   const userId = req.params.id;

  //   const reviews = await productModel.aggregate([
  //     {
  //       $unwind: '$reviews'
  //     },
  //     {
  //       $match: { 'reviews.userId':userId  }
  //     },
  //     {
  //       $lookup: {
  //         from: 'products',
  //         localField: 'reviews.productId',
  //         foreignField: '_id',
  //         as: 'product'
  //       }
  //     },
  //     {
  //       $unwind: '$product'
  //     },
  //     {
  //       $project: {
  //         reviews: '$reviews',
  //         product: '$product'
  //       }
  //     }
  //   ]);

  //   res.status(200).json(reviews);
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ message: 'Failed to get all reviews by user ID', error: error.message });
  // }
};


// const findReviewAndupdate = async(req, res)=>{
 
// }
module.exports = {
  AddProduct,
  getAllproducts,
  editProductStatus,
  addReview,
  getproductsbyvendorid,
  getReviewsByVendorId,
  Addchoose,
  getpendingproducts,
  numberofproductwhichisnotpending,
  addComment,
  getproductSortedbyCreatedDate,
  shareproductbyLink,
  getProductByid ,
  addReply,
  deletecomment, 
  EditComment ,
  deleteReply,
  EditReply,
  DeleteProduct,
  getallreviewsbyuserid,

};
