const mongoose = require('mongoose');
const ClientSchema = mongoose.Schema({
    FirstName: {
        type: String,
        reqire: true
    },
    LastName: {
        type: String,
        reqire: true
    },
    PhoneNumber: {
        type: Number,
        reqire: true,
        unique: true
    },
    Email: {
        type: String,
        reqire: true,
        unique: true

    },
    Password: {
        type: String,
        reqire: true,

    },
    FavouriteProducts: [{
        ProductId: {
            type: String
        },
        vendorId: {
            type: String
        }
    }],
    addresses: [{
        addressLine1: {
          type: String,
          required: true
        },
        addressLine2: {
          type: String
        },
        city: {
          type: String,
          required: true
        },
        state: {
          type: String
    
        },
        zipCode: {
          type: String,
          required: true
        },
        country: {
          type: String,
          required: true
        },
        isDefault: {
          type: Boolean,
          default: false
        }
      }]

})
const ClientModel = mongoose.model('Client', ClientSchema);
module.exports = ClientModel;