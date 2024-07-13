const mongoose=require('mongoose');
const FollowerSchema=mongoose.Schema({
    ClientId:{
type:String
    },
    ClientFollowers:[{
     VendorId:{
     type:String
        }
        }]
       
})
const FollowerModel=mongoose.model('Follower',FollowerSchema);
module.exports = FollowerModel;