const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  video: {
      type: String, 
      required: true,
    },
  idVendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'vendor',
    required: true,
    // type: String,
    // required: true,
  },
  name: {
    type: String,
    required: true,
    // validate: {
    //   validator: (value) => value.split(' ').length > 4,
    //   message: 'Name must contain exactly 4 words',
    // },
  },
  status: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  hashtag: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  warranty: {
    type: Boolean,
    required: true,
  },
  typeWarranty: {
    type: String,
    enum: ['return', 'repair', 'replacement'],
  },
  therearechooses: {
    type: Boolean,
    required: true,
  },
  chooses: [{
      namechoose: {
        type: String,
        required: true
      },
      pricetypechoose: {
        type: String,
        enum: ['same', 'different'],
        required: true
      },
      pricechoose: {
        type: Number,
      },
      img: {
        type: String,
      },color :{
        type: String,
      }
    }
  ],
  reviews: [{
    userId: {
      type: String,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    reviewText: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }

})

var productModel = mongoose.model('products', productSchema)
module.exports = productModel;