const express = require('express');
const app = express();
const fs = require('fs');
const fsPromises = require('fs').promises;

// using middleware to parse the body of the request
app.use(express.json());

/******************************\
|****** FUNCTIONs request *****|
\******************************/
const getAllTours =  (req, res) => {
  res
  .status(200)
  .json({
    status: 'Success',
    results: tours.length,
    data: {
      tours:  tours,
    }
  })
}

const getTour = (req, res) => {
  console.log("req.params: ", req.params);  // in order to obtain the `:id` value. {string}

  // convert this id to a number:
  console.log("typeof req.params.id: ", typeof req.params.id);
  const id = req.params.id * 1;
  console.log("typeof id: ", typeof id);

  // find the tour with the given id:
  const tour = tours.find(el => el.id === id);

  //if(id >= tours.length) {
  if(!tour) {
    return res.status(404).json({
      status: 'failed',
      message: `The ID: ${id} was not found on server 😪`
    })
  }
  res.status(200).json({
    status: 'Success',
    data: {
      tour
    }
  })
}

const updateTour = async (req, res) => {
  try {
    const { id } = req.params; // id  is a string
    const updatedData = req.body;

    const tour = tours.find(el => el.id === id * 1);
    if (!tour) {
      return res.status(404).json({
        status: 'failed',
        message: `The ID: ${id} was not found on server 😪`
      });
    }

    const updatedTour = { ...tour, ...updatedData };
    const tourIndex = tours.findIndex(el => el.id === id * 1);
    tours[tourIndex] = updatedTour;

    await fsPromises.writeFile(
      `${__dirname}/dev-data/data/tours-simple.json`,
      JSON.stringify(tours, null, 2)
    );

    res.status(200).json({
      status: 'success',
      data: {
        tour: updatedTour
      }
    });
  } catch (err) {
    console.error('Error updating tour:', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong while updating the tour 🫤'
    });
  }
}

const deleteTour = async (req, res) => {
  try {
    const { id } = req.params; // id  is a string

    // find the tour with the given id:
    const tour = tours.find(el => el.id === id * 1);

    // if the tour is not found, return a 404 error:
    if (!tour) {
      return res.status(404).json({
        status: 'failed',
        message: `The ID: ${id} was not found on server 😪`
      });
    }

    // create a new array without the tour with the given id:
    const newTours = tours.filter(el => el.id !== id * 1);

    // write the new array to the file:
    await fsPromises.writeFile(
      `${__dirname}/dev-data/data/tours-simple.json`,
      JSON.stringify(newTours, null, 2)
    );

    // send the response:
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    console.error('Error updating tour:', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong while updating the tour 🫤'
    });
  }
}

const createTour = (req, res) => {
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
}


const tours  = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8'));
//app.get('/api/v1/tours', getAllTours)
//app.get('/api/v1/tours/:id', getTour);
//app.patch('/api/v1/tours/:id', updateTour);
//app.delete('/api/v1/tours/:id', deleteTour);
//app.post('/api/v1/tours', createTour)

app.route('/api/v1/tours').get(getAllTours).post(createTour);
app.route('/api/v1/tours/:id').get(getTour).patch(updateTour).delete(deleteTour);

const PORT = 3000;
app.listen(PORT, () => console.log(`App is running on port ${PORT}`));