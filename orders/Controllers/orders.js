const fs = require("fs") ;
const getallOrders = (req,res)=> {
     var orders = JSON.parse(fs.readFileSync('orders.json' , 'utf-8')); 
     res.json(orders);
 }
 const getTheDataSortedByDate = async (req, res) => {
    try {
      const ordersData = await fs.promises.readFile('orders.json', 'utf-8');
      const orders = JSON.parse(ordersData);
  
      const sortedOrders = orders.sort((a, b) => {
        return new Date(b.orderDate) - new Date(a.orderDate);
      });
  
      res.status(200).json(sortedOrders);
    } catch (error) {
      console.error('Error retrieving orders:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
module.exports = {getallOrders , getTheDataSortedByDate};