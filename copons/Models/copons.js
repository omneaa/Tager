const mongoose = require('mongoose');
const coponSchema = mongoose.Schema({
    coponName: {
      type: String,
      required: true,
      trim: true, 
      unique: true 
    },
    code: {
      type: String,
      required: true,
      trim: true,
      unique: true 
    },
    type: {
      type: String,
      required: true,
      enum: ['percentage', 'fixedAmount'] 
    },
    discount: {
      type: Number,
      required: true,
     
    },
    total: { 
      type: Number,
      // min: 0 // Minimum total amount for the discount to apply (optional)
    },
    loginClient: { // Optional field, comment out if not needed
      type: Boolean,
      // default: false // Whether the coupon requires login (optional)
    },
    chargeFree: { // Optional field, comment out if not needed
      type: Boolean,
      // default: false // Whether the coupon waives delivery charges (optional)
    },
    products: [{ // Array to store associated product IDs (optional)
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'products' // Reference to the Product model (optional)
      //  type : [String]
    }],
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    timestouse: { 
      type: Number,
      // min: 1 // Minimum number of times the coupon can be used (optional)
    },
    timetouseforclient: { 
      type: Number,
      // min: 1 // Maximum number of times a client can use the coupon (optional)
    },
    status: {
      type: String,
      required: true,
      enum: ['enabled', 'notenabled'] // Allow only these statuses
    }
  });
var coponModel = mongoose.model('copons', coponSchema)
module.exports = coponModel;