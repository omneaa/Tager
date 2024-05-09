const mongoose = require('mongoose');
const dotenv=require('dotenv');
dotenv.config();
const DB =async()=> {
    mongoose.connect(process.env.MongoURI).then(() => console.log('connected to db')).catch((err) => console.log("error connecting to db"));
};
module.exports= DB
