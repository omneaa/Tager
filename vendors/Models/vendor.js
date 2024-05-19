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
        reqire:true
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
            type:String,
            reqire:true
        },
        AddedTaxFile:{

        }
})
const vendorModel=mongoose.model('vendors',vendorSchema);
module.exports = vendorModel;