const mongoose=require('mongoose');
const vendorSchema=mongoose.Schema({
    vendorName:{

    },
    brandName:{

    },
    vendoeLocation:{

    },
    vendorPhone:{

    },
       vendorEmail:{

        },
        typeOfLicense:{

        } ,
        licenseNumber:{

        },
        LicenseFile:{

        },
        registeredWithAddedTax:{

        },
        AddedTaxCertificate:{

        }
})
const vendorModel=mongoose.model('vendors',vendorSchema);
module.exports = vendorModel;