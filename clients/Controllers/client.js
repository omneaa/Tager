const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Client = require('../../clients/Models/client');
const Followers = require('../../clients/Models/followers');
const Product = require('../../products/Models/product')
const Vendor = require('../../vendors/Models/vendor');
const Essay = require('../../admins/Models/Essay');
const {
  json
} = require('body-parser');
const httpRequest = require('https');
let hashedPassword;
const tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
const jwtSecretKey = process.env.SECRET;
let PhoneCode;
let PhoneNumber;


function validEmail(email) {
  const regex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
  return regex.test(email);
}

const MessageOtp = async (req, res) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'msgEncoding': 'UTF8'
    },
  };
  PhoneCode = Math.trunc(Math.random() * (9999 - 1000) + 1000);
  console.log(PhoneCode);
  PhoneNumber = req.body.PhoneNumber
  const data = `{
    "userName": "Gomalwabas@gmail.com",
    "numbers": ${req.body.PhoneNumber},
    "userSender": "Gomlawbas",
    "apiKey": "1e9f382946e85ae594a084fab01413f7",
    "msg": "Hi your verficaton code is ${PhoneCode}"
  }`;

  const request = httpRequest.request('https://www.msegat.com/gw/sendsms.php', options, response => {
    //console.log('Status', response.statusCode);
    //console.log('Headers', response.headers);
    let responseData = '';

    response.on('data', dataChunk => {
      responseData += dataChunk;
      //console.log(responseData)
    });
    response.on('end', () => {
      return res.json({
        'Response:': response.statusCode
      });
    });
  });

  request.on('error', error => console.log('ERROR', error));

  request.write(data);
  request.end();
}



const PhoneLogin = async (req, res) => {
  var code = req.params.code;
  try {
    if (code == PhoneCode) {
      const jwtSecretKey = process.env.SECRET;
      const user = await Client.findOne({
        PhoneNumber: PhoneNumber
      }, {
        Password: 0
      });
      const data = {
        time: Date(),
      };
      const token = jwt.sign(data, jwtSecretKey);
      res.send({
        "message": 'the code is right',
        "token": token,
        "data": user
      });
    } else {
      res.status(400).json("the code is wrong");

    }
  } catch (err) {
    res.status(500).json(`${err}`);
  }
}

const phoneSignupValidate = async (req, res) => {
  var code = req.params.code;
  try {
    if (code == PhoneCode) {
      res.send({
        "message": 'the code is right'
      });
    } else {
      res.status(400).json("the code is wrong");

    }
  } catch (err) {
    res.status(500).json(`${err}`);
  }
}




const login = async (req, res) => {
  try {
    let data;
    let result = await Client.find({
      "Email": req.params.Email
    }, {
      "FavouriteProducts": 0,
      _id: 1
    });
    const found = JSON.stringify(result);
    if (found === "[]") {
      return res.status(400).json({
        "message": "this email not found"
      });
    }

    for (const [key, value] of Object.entries(result)) {
      let password = value.Password;
      let ID = value._id;
      let isPasswordValid = await bcrypt.compareSync(req.params.Password, password);
      if (isPasswordValid) {
        data = {
          id: result._id,
          Email: result.Email
        };
        const token = jwt.sign(data, jwtSecretKey);
        return res.status(200).json({
          "message": "ok",
          "JWT": token,
          "Client data": result
        });

      } else {
        return res.status(400).json({
          "message": "the password is wrong "
        });
      }

    }
  } catch (e) {
    res.status(400).json({
      "error": e.error
    });

}


// comment here here !!!
// const ViewAllVendorReviews=async(req,res)=>{
//     try {
//         const vendorId = req.params.id;
//         const vendorReviews = await Vendor.findById(vendorId,{reviews:1,averageRating:1});
    
//         return res
//           .status(200)
//           .json({
//             message: "vendor reviews retrieved successfully",
//             data: vendorReviews,
//           });
//       } catch (error) {
//         console.error(error);
//         return res
//           .status(500)
//           .json({
//             message: "Failed to retrieve product reviews",
//             error: error.message,
//           });
//       }
      
// }
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
const result=await Product.find({"status":"Accepted"}).sort({"views":-1});
return res.status(200).json({ message: "trending views", products:result});
  }
  catch(e)
  {
    return res.status(500).json({ message: "Error ", error: error.message});

  }
}

const logout = async (req, res) => {
  return res.status(200).json({
    "message": "ok"
  });
}
const viewProductByProductId = async (req, res) => {
  const result = await Product.findById(req.params.id);
  return res.status(200).json({
    "message": "done",
    "product": result
  });
}



const ViewLowestPriceProducts = async (req, res) => {
  const result = await Product.find({
    "status": "Accepted"
  }).sort({
    price: 1
  });
  return res.status(200).json({
    "message": "lowest price products",
    "product": result
  });
}

const ViewHighestPriceProducts = async (req, res) => {
  const result = await Product.find({
    "status": "Accepted"
  }).sort({
    price: -1
  });
  return res.status(200).json({
    "message": "highest price products",
    "product": result
  });
}


const ViewHighRatedProducts = async (req, res) => {
  const result = await Product.find({
    "status": "Accepted"
  }).sort({
    averageRating: -1
  })
  return res.status(200).json({
    "message": "high rated products",
    "products": result
  });
}


const AddVendorReview = async (req, res) => {
  try {
    const {
      vendorId,
      userId,
      rating,
      reviewText
    } = req.body;
    const vendor = await Vendor.findById(vendorId);
    if (!vendor) {
      console.log("not found");
      return res.status(404).json({
        message: "vendor not found"
      });
    } else {
      const totalRating = Number(vendor.totalRating) + Number(rating);
      const averageRating = ((Number(totalRating) / (5 * (vendor.reviews.length + 1)))) * 5;
      const newReview = {
        userId,
        rating,
        reviewText,
      };

      const updatedReviews = await Vendor.findByIdAndUpdate(
        vendorId, {
          $push: {
            reviews: newReview
          }
        }, {
          new: true
        }
      );

      const updated = await Vendor.findByIdAndUpdate(
        vendorId, {
          $set: {
            "totalRating": totalRating,
            "averageRating": averageRating
          }
        }, {
          new: true
        }
      );

      res
        .status(201)
        .json({
          message: "Review added successfully to vendor",
          data: updated
        });
    }
  } catch (error) {
    res
      .status(400)
      .json({
        message: "Failed to add review",
        error: "vendor not found"
      });
  }
}



const ViewAllVendorReviews = async (req, res) => {
  try {
    const vendorId = req.params.id;
    const vendorReviews = await Vendor.findById(vendorId, {
      reviews: 1,
      averageRating: 1
    });

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
  // comment here 3
// const IncreaseProductViews = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     const views = Number(product.views) + 1;
//     const result = await Product.findByIdAndUpdate(req.params.id, {
//       "views": views
//     }, {
//       new: true
//     });
//     return res.status(200).json({
//       message: "views increased",
//       data: result
//     });
//   } catch (e) {
//     return res.status(500).json({
//       message: "Error ",
//       error: error.message
//     });
//   }
// }
const ViewTrendingProducts = async (req, res) => {
  try {
    const result = await Product.find().sort({
      "views": -1
    });
    return res.status(200).json({
      message: "trending views",
      products: result
    });
  } catch (e) {
    return res.status(500).json({
      message: "Error ",
      error: error.message
    });
  }
}

const SearchByDescription = async (req, res) => {
  try {
    const regex = new RegExp(req.params.description);
    const result = await Product.find({
      description: {
        $regex: regex
      },
      status: "Accepted"
    });
    return res.status(200).json({
      message: "products with description",
      products: result
    });
  } catch (e) {
    return res.status(500).json({
      message: "Error ",
      error: e.message
    });
  }
}

const AddFavouriteProduct = async (req, res) => {
  try {
    const {
      productId,
      vendorId
    } = req.params;
    const ID = {
      productId
    }
    const result = await Client.findByIdAndUpdate(req.params.clientId, {
      $push: {
        FavouriteProducts: {
          ProductId: productId,
          vendorId: vendorId
        }
      }
    }, {
      new: true
    });

    return res.status(200).json({
      message: "product added to your favourite products",
      result: result
    });
  } catch (e) {
    return res.status(500).json({
      message: "Error ",
      error: e.message
    });
  }

}

const DeleteFavouriteProduct = async (req, res) => {
  try {
    const {
      productId
    } = req.params;
    const ID = {
      productId
    }
    const result = await Client.findByIdAndUpdate(req.params.clientId, {
      $pull: {
        FavouriteProducts: {
          ProductId: productId
        }
      }
    }, {
      new: true
    });

    return res.status(200).json({
      message: "product deleted from your favourite products",
      result: result
    });
  } catch (e) {
    return res.status(500).json({
      message: "Error ",
      error: e.message
    });
  }

}




const GetAllFavouriteProducts = async (req, res) => {
  const clientId = req.params.clientId;
  const productDetails = [];
  try {
    const data = await Client.findById(clientId, {
      FavouriteProducts: 1,
      _id: 0
    });
    if (!data) {
      return res.status(404).json({
        message: 'Client not found'
      });
    }
    const productIds = data.FavouriteProducts.map(product => product.ProductId);
    for (const productId of productIds) {
      let product = await Product.findById(productId, {
        __v: 0
      });
      productDetails.push(product);
    }
    return res.status(200).json({
      message: "your favourite products",
      productDetails,
    });
  } catch (err) {
    console.error('Error fetching client or favorite products:', err);
    return res.status(500).json({
      message: 'Internal server error'
    });
  }
};



const FollowVendor = async (req, res) => {
  try {
    const {
      vendorId
    } = req.params;
    const ID = {
      vendorId
    }


    let result = await Followers.findOneAndUpdate({
      "ClientId": req.params.clientId
    }, {
      $push: {
        ClientFollowers: {
          VendorId: vendorId
        }
      }
    }, {
      new: true
    });
    if (!result) {
      return result = await Followers.create({
        "ClientId": req.params.clientId
      }, {
        $push: {
          ClientFollowers: {
            VendorId: vendorId
          }
        }
      });
    } else {
      return res.status(200).json({
        message: "now you follow new vendor",
        result: result
      });
    }
  } catch (e) {
    return res.status(500).json({
      message: "Error ",
      error: e.message
    });
  }
}

const UnfollowVendor = async (req, res) => {
  try {
    const {
      vendorId
    } = req.params;
    const ID = {
      vendorId
    }
    const result = await Followers.findOneAndUpdate({
      "ClientId": req.params.clientId
    }, {
      $pull: {
        ClientFollowers: {
          VendorId: vendorId
        }
      }
    }, {
      new: true
    });

    return res.status(200).json({
      message: "now you unfollwed vendor",
      result: result
    });
  } catch (e) {
    return res.status(500).json({
      message: "Error ",
      error: e.message
    });
  }

}


const ClientSignup = async (req, res) => {

  try {
    const {
      Email,
      Password,
      FirstName,
      LastName,
      PhoneNumber
    } = req.body;
    if (!validEmail(req.body.Email)) {
      return res.status(400).json({
        "message": "email not valid"
      });
    }

    const isClient = await Client.find({
      $or: [{
        "Email": Email
      }, {
        PhoneNumber: PhoneNumber
      }]
    });
    if (isClient.length !== 0) {

      return res.status(400).json({
        "message": "email or phone exist"
      });
    } else {
      hashedPassword = await bcrypt.hash(Password, 10);
      const newclient = {
        Email: Email,
        Password: hashedPassword,
        FirstName: FirstName,
        LastName: LastName,
        PhoneNumber: PhoneNumber
      }
      const result = await Client.create(newclient);
      return res.status(200).json({
        "message": "signed up successfully",
        "data": result
      });
    }
  } catch (e) {
    res.status(400).json({
      "error": e.error
    });
  }
}


const AllEssays = async (req, res) => {
  try {

    const result = await Essay.find();
    return res.status(200).json({
      "message": "all essays",
      "result": result
    });
  } catch (e) {
    res.status(400).json({
      "error": e.error
    });
  }
}

const DeleteClient = async (req, res) => {
  try {

    const result = await Client.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      "message": "client account deleted"
    });
  } catch (e) {
    res.status(400).json({
      "error": e.error
    });
  }
}
// comment 2 here 
// const EditProfile = async (req, res) => {
//   try {

//     if (req.body.Email) {
//       if (!validEmail(req.body.Email)) {
//         return res.status(400).json({
//           "message": "email not valid"
//         });

// catch(e){
//   res.status(400).json({"error":e.error});
// }
// }
const EditProfile=async(req,res)=>{
  try{	
    let ID;
    if(req.body.Email){
      if(!validEmail(req.body.Email)){
        return res.status(400).json({ "message": "email not valid"});
 }
      const EmailCheck = await Client.find({"Email":req.body.Email});
      for (const clientId of EmailCheck) {
        ID=clientId._id;
       // console.log(ID)
        // return res.json(ID);
      }
      if(ID != req.params.id)
      {
        console.log(typeof(ID));
        console.log(typeof(req.params.id))
        return res.status(400).json({ message: "the new email exist"});

      }
      const EmailCheck = await Client.find({
        "Email": req.body.Email
      });
      if (EmailCheck.length !== 0) {
        return res.status(400).json({
          message: "the new email exist"
        });
      }

    }

    if (req.body.PhoneNumber) {
      const PhoneCheck = await Client.find({
        "PhoneNumber": req.body.PhoneNumber
      });
      if (PhoneCheck.length !== 0) {
        return res.status(400).json({
          message: "the new Phone number exist"
        });

    if(req.body.PhoneNumber){
      const PhoneCheck=await Client.find({"PhoneNumber":req.body.PhoneNumber});
      for (const clientId of PhoneCheck) {
        ID=clientId._id;
      }
      if(ID != req.params.id)
      {
        return res.status(400).json({ message: "the new Phone number exist"});

      }
    }



    if (req.body.Password) {
      const hashedPassword = await bcrypt.hash(req.body.Password, 10);
      req.body.Password = hashedPassword;
    }



    const data = await Client.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, {
      new: true,
      select: "FirstName LastName _id Email"
    });
    return res.status(200).json({
      message: "profile edited",
      data: data
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }

        const data =await Client.findByIdAndUpdate(req.params.id,{$set:req.body},{new: true,select: "FirstName LastName _id Email PhoneNumber"});
        return res.status(200).json({ message: "profile edited", data:data});
        }
        catch(err){
          return res.status(500).json({ error: err.message});
        }

}



//Not complete have bug
const GetAllFollowers = async (req, res) => {
  const clientId = req.params.clientId;
  const vendorsDetails = [];
  try {
    const data = await Followers.find({
      "ClientId": clientId
    }, {
      ClientFollowers: 1,
      _id: 0
    });
    if (!data) {
      return res.status(404).json({
        message: 'Client not found'
      });
    }

    let venLen = 0;

    let result = [];
    for (const vendorId of data) {
      venLen = vendorId.ClientFollowers.length;
      for (let i = 0; i < venLen; i++) {
        let vendorData = await Vendor.findById(vendorId.ClientFollowers[i].VendorId);
        //console.log(vendorId.ClientFollowers[i].VendorId);
        result.push(vendorData);
      }
    }

    return res.status(200).json({
      message: "your followers",
      "result": result
    });
  } catch (err) {

    return res.status(500).json({
      message: 'Internal server error',
      "error": err.message
    });
  }
}

const  addAddresses= async (req, res) => {
  try {
   const  ClientId = req.params.cid;
    const {
  
      addressLine1,
      addressLine2,
      city,
      state,
      zipCode,
      country,
      isDefault
    } = req.body;
    const result = await Client.findByIdAndUpdate(ClientId, {
      $push: {
        addresses: {
          addressLine1,
      addressLine2,
      city,
      state,
      zipCode,
      country,
      isDefault
        }
      }
    }, {
      new: true,
    //  select: "Addresses"
    });
    return res.status(200).json({
      message: "addresses added successfully",
      
    });
    } catch (err) {
      console.error('Error adding addresses:', err);
      return res.status(500).json({
        message: 'Internal server error'
      });
    }

}
const EditAddress = async (req, res) => {
  try {
    const clientId=req.params.cid;const addressId  = req.params.aid;
    const { addressLine1, addressLine2, city, state, zipCode, country, isDefault } = req.body;
    console.log(clientId);
    console.log(addressId);
    
    const client = await Client.findById(clientId);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    const addressIndex = client.addresses.findIndex(address => address._id.toString() === addressId);
    if (addressIndex === -1) {
      return res.status(404).json({ message: 'Address not found' });
    }

    client.addresses[addressIndex] = {
      addressLine1,
      addressLine2,
      city,
      state,
      zipCode,
      country,
      isDefault
    };

    await client.save();

    res.status(200).json({ message: 'Address updated successfully' });
  } catch (err) {
    console.error('Error updating address:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const DeleteAddress = async(req,res)=>{
  try {
    const clientId = req.params.cid;
    const addressId = req.params.aid;
    const client = await Client.findById(clientId);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    const addressIndex = client.addresses.findIndex(address => address._id.toString() === addressId);
    if (addressIndex === -1) {
      return res.status(404).json({ message: 'Address not found' });
    }

    client.addresses.splice(addressIndex, 1);
    await client.save();
    res.status(200).json({ message: 'Address deleted successfully' });
    
  } catch (err) {
    console.error('Error deleting address:', err);
    res.status(500).json({ message: 'Internal server error' });
  
  }
}
const GetallAddress = async (req, res) => {
  try {
    const clientId = req.params.cid;
    const client = await Client.findById(clientId);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    return res.status(200).json({ message: 'Addresses', addresses: client.addresses });
  } catch (err) {
    console.error('Error getting addresses:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}
const GetClientProfile=async(req,res)=>{
  try{
  const profile=await Client.findById(req.params.clientId,{Password:0});
  return res.status(200).json({message: "client profile","data":profile});

  }
  catch(e){
    return res.status(500).json({ message: 'Internal server error',"error":e.message });
  }
}
module.exports = {
  login,
  logout,
  viewProductByProductId,
  ViewLowestPriceProducts,
  ViewHighestPriceProducts,
  ViewHighRatedProducts,
  AddVendorReview,
  ViewAllVendorReviews,
  IncreaseProductViews,
  ViewTrendingProducts,
  SearchByDescription,
  AddFavouriteProduct,
  DeleteFavouriteProduct,
  GetAllFavouriteProducts,
  FollowVendor,
  UnfollowVendor,
  ClientSignup,
  AllEssays,
  DeleteClient,
  EditProfile,
  GetAllFollowers,
  MessageOtp,
  PhoneLogin,
  phoneSignupValidate,
  addAddresses,
  EditAddress,
  DeleteAddress,
  GetallAddress,
  GetClientProfile
};
