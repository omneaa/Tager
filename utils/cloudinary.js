const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
dotenv.config()
// console.log(process.env.CLOUDINARY_CLOUD_NAME);
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET

})
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'products',
        allowedFormats: ['jpeg', 'png', 'jpg'],
    }
});
const storage2=new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'products',
        allowedFormats: ['pdf', 'png', 'jpg'],
    }
});

module.exports = {
    storage,storage2
};
// module.exports = cloudinary;