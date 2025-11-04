const express = require('express');
const app = express();
const fs = require('fs');
/*
app.get('/', (req, res) =>{
  //res.status(200).send("Hello from the server side!");
  res.status(200).json({message: "Hello from the server side!", app: "Natours API"});
})

app.post('/', (req, res) => {
  res
  .status(201)
  .send('You can post to this endpoint...');
});
*/

const tours  = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8'));
app.get('/api/v1/tours', (req, res) => {
  res
  .status(200)
  .json({
    status: 'Success',
    results: tours.length,
    data: {
      tours:  tours,
    }
  })
})

const PORT = 3000;
app.listen(PORT, () => console.log(`App is running on port ${PORT}`));