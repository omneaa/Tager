const productModel = require('../Models/product');

const AddProduct = async (req, res) => {
   try {
       
    const requiredFields = ['name', 'description', 'hashtag', 'price', 'warranty', 'therearechooses'];
    const missingFields = requiredFields.filter(field => !req.body[field]);

    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }
    const choosesArray = [];
    const numChooses = Object.keys(req.body)
  .filter(key => key.startsWith('chooses[')) // Filter keys starting with chooses[
  .map(key => parseInt(key.match(/chooses\[(\d+)\]/)[1], 10)) // Extract integer index using regex
  .reduce((maxIndex, currentIndex) => Math.max(maxIndex, currentIndex), 0); // Find max index

    for (let i = 0; i <= numChooses; i++) {
      choosesArray.push({
        namechoose: req.body[`chooses[${i}].namechoose`],
        pricetypechoose: req.body[`chooses[${i}].pricetypechoose`],
        pricechoose: req.body[`chooses[${i}].pricechoose`] ? parseFloat(req.body[`chooses[${i}].pricechoose`]) : null, // Handle optional pricechoose
        imgchoose : req.body[`chooses[${i}].imgchoose`] ,
      });
    }
   const product = new productModel({
      //  video :`${req.files['video'][0].path}` ,
       name :`${req.body.name}`,
       img :`${req.files['img'][0].path}` ,
       description :`${req.body.description}`,
       hashtag :`${req.body.hashtag}`,
       price :`${req.body.price}`,
       warranty :`${req.body.warranty}`,
       typeWarranty :`${req.body.typeWarranty}`,
       therearechooses :`${req.body.therearechooses}`,
       chooses : choosesArray,
    });
    // console.log('chooses data before saving:', product.chooses)
    // console.log(`${req.body.chooses[1].namechoose}`);
    res.json({ MSG: 'Successfully' ,data :product});
   } catch (error) {
     console.error(error);
     res.json({ error:error });
   }
 };
 
module.exports = AddProduct;















   //   const { video, name, img1, description, hashtag, price, warranty, typeWarranty, therearechooses, chooses } = req.body; // Assuming data comes from request body
 
   //   // Validation (optional, can be extended)
   //   if (!video || !name || !img1 || !description || !hashtag || !price || !warranty || !therearechooses || !chooses) {
   //     throw new Error('Required fields are missing');
   //   }
 
   //   const newProduct = new productModel({
   //     video,
   //     name,
   //     img1,
   //     description,
   //     hashtag,
   //     price,
   //     warranty,
   //     typeWarranty,
   //     therearechooses,
   //     chooses,
   //   });
 
   //   await newProduct.save(); // Save the new product
 
   //   res.send(req.files['video'][0].path);
   //   res.json(req.files['img'][0].path);
   // res.json(newProduct)