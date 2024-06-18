const ordersModel = require ('../Models/orders');

const express = require('express');
 const getTheOrdersAccordingToFilters= async (req, res) => {
    try {
      const orders = await ordersModel.find();
      const sortedOrders = orders.sort((a, b) => {
        return new Date(b.orderDate) - new Date(a.orderDate);
      });
  
      res.status(200).json(sortedOrders);
    } catch (error) {
      console.error('Error retrieving orders:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
// const getTheOrdersAccordingToFilters = async (req, res) => {
//     try {
//       const { startDate } = req.query;
//       if (!startDate) {
//         return res.status(400).json({ message: 'Start date is required' });
//       }
//       const start = new Date(startDate);
//       const now = new Date();
//       console.log(start);
//       console.log(now);
//       const orders = await ordersModel.find({
//         orderDate: {
//           $gte: start,
//           $lt: now,
//         },
//       });
//       console.log('Orders:', orders);
//       if (orders.length === 0) {
//         return res.status(404).json({ message: 'No orders found' });
//       }
//       res.status(200).json(orders);
//     } catch (error) {
//       console.error('Error fetching orders:', error);
//       res.status(500).json({ message: 'Server error', error });
//     }
//   };
  
  const getNumberoforders=async(req,res)=>{
    try{
          const result=await ordersModel.countDocuments();
          res.status(200).json({message:"number of orders",data:result});
      }
      catch(e){
          res.status(400).json(e);
      }
  }
module.exports = { getTheOrdersAccordingToFilters,getNumberoforders };