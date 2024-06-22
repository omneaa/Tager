const express=require('express');
const DB=require('./config/database');
const cors = require("cors") ;
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const productRoutes = require('./products/Routes/product');
const VendorRoutes=require('./vendors/Routes/vendor');
const OrderRoutes= require('./orders/Routes/orders');
const AdminRoutes=require('./admins/Routes/Admin');
const coponRoutes=require('./copons/Routes/copons');
const ClientRoutes=require('./clients/Routes/client');
const MessageRoutes=require('./message/Routes/message');
DB();
// midelware 
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use (cors({
  origin: "*",
  methods: ["GET", "POST"],
}  
))
// app.use(bodyParser.json());
app.use ('/products' , productRoutes)
app.use('/vendor',VendorRoutes);
app.use('/order' , OrderRoutes);
app.use('/admin',AdminRoutes);
app.use('/copons' ,coponRoutes);
app.use('/client' ,ClientRoutes);
app.use('/message', MessageRoutes);
app.get('/', (req, res) => {
  res.send('Welcome to my server!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
