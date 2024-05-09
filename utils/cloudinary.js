const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
dotenv.config()
console.log(process.env.CLOUDINARY_CLOUD_NAME);
cloudinary.config({
    
    cloudname:process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

module.exports = cloudinary;