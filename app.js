const express = require('express');
const app = express();
const fs = require('fs');

// using middleware to parse the body of the request
app.use(express.json());

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

app.get('/api/v1/tours/:id', (req, res) => {
  console.log("req.params: ", req.params);  // in order to obtain the `:id` value. {string}

  // convert this id to a number:
  console.log("typeof req.params.id: ", typeof req.params.id);
  const id = req.params.id * 1;
  console.log("typeof id: ", typeof id);

  //if(id >= tours.length) {
  if(!tour) {
    return res.status(404).json({
      status: 'failed',
      message: `The ID: ${id} was not found on server 😪`
    })
  }

  // find the tour with the given id:
  const tour = tours.find(el => el.id === id);
  res.status(200).json({
    status: 'Success',
    data: {
      tour
    }
  })
})

app.post('/api/v1/tours', (req, res) => {
  // Generate new ID
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId}, req.body);
  console.log("newTour: ", newTour)
  //Add newTour to the tour array:
  tours.push(newTour);

  // Write the updated tours array to the file:
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        }
      })
    }
  )
})

const PORT = 3000;
app.listen(PORT, () => console.log(`App is running on port ${PORT}`));