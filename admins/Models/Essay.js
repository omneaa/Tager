const mongoose=require('mongoose');
const essaySchema=mongoose.Schema({
    essayName:{
type:String,

    },
    essayBody:{
        type:String,
    
    },
    
    
})
const essayModel=mongoose.model('essay',essaySchema);
module.exports = essayModel;