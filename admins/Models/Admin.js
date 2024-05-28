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
    vendoeLocation:{
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
        }
})
const vendorModel=mongoose.model('vendor',vendorSchema);
module.exports = vendorModel;