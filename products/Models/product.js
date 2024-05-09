const mongoose = require('mongoose') ;
const productSchema=mongoose.Schema({
    // name : {
    //     type: String,
    //     required: true
    // },
    img :{
        type : Object
    }
   
})

var productModel = mongoose.model('products', productSchema)
module.exports = productModel