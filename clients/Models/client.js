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
        reqire:true
    },
       Email:{
        type:String,
        reqire:true,
        
        },
        Password:{
            type:String,
            reqire:true,
            
            }
       
})
const ClientModel=mongoose.model('Client',ClientSchema);
module.exports = ClientModel;