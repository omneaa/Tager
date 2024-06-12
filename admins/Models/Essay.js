const mongoose=require('mongoose');
const essaySchema=mongoose.Schema({
    title:{
type:String,

    },
    body:{
        type:String,
    
    },
    
    
})
const essayModel=mongoose.model('essay',essaySchema);
module.exports = essayModel;