const express=require('express');
const DB=require('./config/database')
const app = express();
const port = 3000;
DB();
app.get('/', (req, res) => {
  res.send('Welcome to my server!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
