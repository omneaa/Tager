const mongoose = require('mongoose') ;
const productSchema=mongoose.Schema({
    name : {
        type: String,
        required: true
    },
   
})

var productModel = mongoose.model('products', productSchema)
module.exports = productModel