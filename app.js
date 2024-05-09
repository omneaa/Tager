const express=require('express');
const DB=require('./config/database')
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
const productRoutes = require('./products/Routes/product');
DB();
// midelware 
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(bodyParser.json());
app.use ('/products' , productRoutes)
app.get('/', (req, res) => {
  res.send('Welcome to my server!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
