const mongoose=require('mongoose');
const ClientSchema=mongoose.Schema({
    FirstName:{
type:String,
reqire:true
    },
    LastName:{
        type:String,
        reqire:true
    },
    PhoneNumber:{
        type:Number,
        reqire:true,
        unique:true
    },
    Email:{
        type:String,
        reqire:true,
        unique:true
        
        },
    Password:{
            type:String,
            reqire:true,
            
            },
    FavouriteProducts:[{
                ProductId:{
                type:String
                }
            }]
       
})
const ClientModel=mongoose.model('Client',ClientSchema);
module.exports = ClientModel;