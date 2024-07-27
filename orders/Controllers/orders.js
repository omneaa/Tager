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

  const getNumberoforders=async(req,res)=>{
    try{
          const result=await ordersModel.countDocuments();
          res.status(200).json({message:"number of Orders",data:result});
      }
      catch(e){
          res.status(400).json(e);
      }
  }
module.exports = { getTheOrdersAccordingToFilters , getNumberoforders};