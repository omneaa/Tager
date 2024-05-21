const fs = require("fs") ;
const getallOrders = (req,res)=> {
     var orders = JSON.parse(fs.readFileSync('orders.json' , 'utf-8')); 
     res.json(orders);
 }

module.exports = getallOrders;