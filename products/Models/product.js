const mongoose = require('mongoose') ;
const choosesSchema =  mongoose.Schema({
    namechoose: { type: String, required: true },
    pricetypechoose :{
        type : String, 
        enum : ['same' , 'different'] ,
        required : true
    }, 
    pricechoose :{
        type: Number,
        // required: true,
    
    }, 
    imgchoose: {
        type: String,
        required: true,
      },

});
const productSchema=mongoose.Schema({
    // video: {
    //     type: String, 
    //     required: true,
    //   },
      name: {
        type: String,
        required: true,
        validate: {
          validator: (value) => value.split(' ').length === 4,
          message: 'Name must contain exactly 4 words',
        },
      },
      img: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      hashtag : {
        type : String,
        required: true,
      },price:{
        type : Number,
        required: true,
      },warranty :{
        type : Boolean,
        required: true,
      }, typeWarranty:{
        type: String,
        enum: ['return', 'repair', 'replacement'],
      },therearechooses:{
        type:Boolean,
        required: true,
      }, chooses:{
        type: [choosesSchema],
        required: true,
      },
   
})

var productModel = mongoose.model('products', productSchema)
module.exports = productModel;