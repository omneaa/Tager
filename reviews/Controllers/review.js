const reviewModel=require('../Models/review'); 
const addReview = async (req, res) => {
    try {
      // Validate request body
      const { productId, userId, rating, reviewText } = req.body;
      if (!productId || !userId || !rating || !reviewText) {
        throw new Error('Missing required fields: productId, userId, rating, reviewText');
      }
  
      // Create a new review instance
      const newReview = new reviewModel({
        productId,
        userId,
        rating,
        reviewText,
      });
  
      // Save the review to the database
      await newReview.save();
  
      res.status(201).json({ message: 'Review added successfully', data: newReview });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Failed to add review', error: error.message });
    }
  };
  const getAllReviews = async (req, res) => {
    try {
      const reviews = await reviewModel.find().populate(''); // Populate the 'product' field
      res.status(200).json({ message: 'Reviews retrieved successfully', data: reviews });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to retrieve reviews', error: error.message });
    }
  };
module.exports = {addReview , getAllReviews }
