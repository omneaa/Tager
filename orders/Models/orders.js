const mongoose = require('mongoose');
const ordersSchema = mongoose.Schema({
    orderId: {
      type: String,
      required: true,
      unique: true 
    },
    customerId: {
      type: String,
      required: true
    },
    
    status: {
      type: String,
      required: true
    },
    
    orderDate: {
      type: Date,
      default: Date.now,
    },
    products: {
      type: [
        new mongoose.Schema({
          productId: {
            type: String,
            required: true
          },
          productName: {
            type: String,
            required: true
          },
          quantity: {
            type: Number,
            required: true,
          },
          price: {
            type: Number,
            required: true,
          }
        })
      ],
      required: true
    }
  });
var ordersModel = mongoose.model('orders', ordersSchema)
module.exports = ordersModel;