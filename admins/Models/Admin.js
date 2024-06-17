const mongoose=require('mongoose');
const AdminSchema=mongoose.Schema({
    
       Email:{
        type:String,
        reqire:true,
        
        },
        Password:{
            type:String,
            reqire:true
        } ,
       
})
const AdminModel=mongoose.model('Admin',AdminSchema);
module.exports = AdminModel;