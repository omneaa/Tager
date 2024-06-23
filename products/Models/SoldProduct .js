const mongoose = require('mongoose');
const SoldProductSchema = mongoose.Schema({
productId:{
    type:String
},
  soldProduct: [{
      
      clientID: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
      },
      soldAt: {
        type: Date,
      }
    }
  ]}
  

);

var SoldProductModel = mongoose.model('SoldProduct', SoldProductSchema)
module.exports = SoldProductModel;