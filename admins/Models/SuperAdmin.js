const mongoose=require('mongoose');
const SuperAdminSchema=mongoose.Schema({
    
       Email:{
        type:String,
        reqire:true,
        
        },
        Password:{
            type:String,
            reqire:true
        } ,
       
})
const SuperAdminModel=mongoose.model('SuperAdmin',SuperAdminSchema);
module.exports = SuperAdminModel;