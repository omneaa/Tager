const mongoose=require('mongoose');
const vendorSchema=mongoose.Schema({
    vendorName:{
type:String,
reqire:true
    },
    brandName:{
        type:String,
        reqire:true
    },
    vendorLocation:{
        type:String,
        reqire:true
    },
    vendorPhone:{
        type:Number,
        reqire:true
    },
       vendorEmail:{
        type:String,
        reqire:true,
        
        },
        typeOfLicense:{
            type:String,
            reqire:true
        } ,
        licenseNumber:{
            type:Number,
            reqire:true
        },
        LicenseFile:{
            type:String,
            reqire:true
        },
        registeredWithAddedTax:{
            type: Boolean,
            reqire:true
        },
        AddedTaxFile:{
            type:String,
            reqire:true
        },
        logo:{
            type:String,
            
        },

        status:{
 type:String,
 default:"pending"
        },
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
          totalRating:{
            type:Number,
            default:0,
          },
          averageRating:{
            type:Number,
            default:0
          }
})
const vendorModel=mongoose.model('vendor',vendorSchema);
module.exports = vendorModel;