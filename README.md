# 👨🏾‍💻 Section 06 - Express: Let's start building the Natours API!

## 📚 Lecture 050: Setting Up Expressand Basic Routing

### 1. Install **`npm`**:
```bash
npm init -y
```

### 2. Install **`express`**:
```bash
npm i express
```

### 3. Create **`app.js`** file:
1. Import Express:
```js
// ./app.js
const express = require('express');
const app = express();
```

2. Working with PORT:
```js
const express = require('express');
const app = express();

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}..`);
});
```

3. Adding First Route:

3.1. Send a message:
```js
const express = require('express');
const app = express();

app.get('/', (req, res) =>{
  res.status(200).send("Hello from the server side!");
})
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
```

3.2 Sending a json:
```js
const express = require('express');
const app = express();

app.get('/', (req, res) =>{
  res
    .status(200)
    .json({message: "Hello from the server side!", app: "Natours API"});
})
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
```

Run:
```bash
nodemon app.js
```
Review outcomes:
- terminal
- postman: GET **127.0.0.1:3000**
- browser: **http:licalhost:3000**


3.3 Create a POST:
```js
const express = require('express');
const app = express();

app.get('/', (req, res) =>{
  //res.status(200).send("Hello from the server side!");
  res.status(200).json({message: "Hello from the server side!", app: "Natours API"});
})

app.post('/', (req, res) => {
  res
    .status(201)
    .send('You can post to this endpoint...');
})  // 👈🏽 ✅

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
```

Run:
```bash
nodemon app.js
```
Review outcomes:
- terminal
- postman: POST **127.0.0.1:3000**
- browser: **http:licalhost:3000**


## 📚 Lecture 051: APIs and RESTful API Design

<img src="./img/section06-lecture051-001.png">
<img src="./img/section06-lecture051-002.png">
<img src="./img/section06-lecture051-003.png">
<img src="./img/section06-lecture051-004.png">
<img src="./img/section06-lecture051-005.png">


## 📚 Lecture 052: Starting Our API: Handling GET Requests

```js
const express = require('express');
const app = express();
const fs = require('fs');

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
```

<img src="./img/section06-lecture052-001.png">


## 📚 Lecture 053: Handling POST Requests

### 1. Create the **`POST`** request:
```js
const express = require('express');
const app = express();
const fs = require('fs');
// using middleware to parse the body of the request
app.use(express.json());  // 👈🏽 ✅
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
app.post('/api/v1/tours', (req, res) => {  // 👈🏽 ✅
  console.log(req.body);
  res.send('DONE!');
})
const PORT = 3000;
app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
```

#### 1.1. Testing from POSTMAN:
<img src="./img/section06-lecture053-001.png">

#### 1.2. Ooutcome from Terminal/server:
<img src="./img/section06-lecture053-002.png">

#### 1.3 Testing:
Comment the middleware code `app.use(express.json());` and verify the outcome.


### 2. Complete the **`POST`** request:
```js
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
app.post('/api/v1/tours', (req, res) => {
  // Generate new ID
  const newId = tours[tours.length - 1].id + 1; // 👈🏽 ✅
  const newTour = Object.assign({ id: newId}, req.body); // 👈🏽 ✅
  //Add newTour to the tour array:
  tours.push(newTour); // 👈🏽 ✅
  // Write the updated tours array to the file:
  fs.writeFile( // 👈🏽 ✅
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
```

### Testing from POSTMAN:
<img src="./img/section06-lecture053-003.png">


## 📚 Lecture 054: Responding to URL Parameters

### 1. What is a Params?
```js
app.get('api/v1/tours/:id', (req, res) => {})
```
- In this case, params is **`id`**.
- In case the URL is **`api/v1/tours/:id/:x/:y`**, then params would be `:/id/:x/:y` and all three params are mandatory. 
- In case one param is optional as `:y`, it should be as **`api/v1/tours/:id/:x/:y?`**

### 2. Create the findOne Tour:
```js
// ./app.js
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

//  👈🏽 ✅ 
app.get('/api/v1/tours/:id', (req, res) => {
  console.log("req.params: ", req.params);  // in order to obtain the `:id` value. {string}

  // convert this id to a number:
  console.log("typeof req.params.id: ", typeof req.params.id);
  const id = req.params.id * 1;
  console.log("typeof id: ", typeof id);

  // find the tour with the given id:
  const tour = tours.find(el => el.id === id);
  res.status(200).json({
    status: 'Success',
    data: {
      tour
    }
  })
})//  👈🏽 ✅ 

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
```

> Issue:
- Given any id value (out of scope tours array length) and still get 200 as status code.

### 3. Fixing this issue:
```js
// app.js
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

  //  👈🏽 ✅ 
  //if(id >= tours.length) {
  if(!tour) {
    return res.status(404).json({
      status: 'failed',
      message: `The ID: ${id} was not found on server 😪`
    })
  }//  👈🏽 ✅ 

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
```


## 📚 Lecture 055: Handling PATCH Requests

```js
app.patch('/api/v1/tours/:id', async (req, res) => {
  try {
    const { id } = req.params; // 👉🏽 id  is a string
    const updatedData = req.body; // body from request

    const tour = tours.find(el => el.id === id * 1);
    if (!tour) {
      return res.status(404).json({
        status: 'failed',
        message: `The ID: ${id} was not found on server 😪`
      });
    }

    // update the tour with the new data:
    const updatedTour = { ...tour, ...updatedData };
    const tourIndex = tours.findIndex(el => el.id === id * 1);  // original id is string
    tours[tourIndex] = updatedTour;

    // write the updated tours array to the file
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
});
```

## 📚 Lecture 056: Handling DELETE Request

```js
app.delete('/api/v1/tours/:id', async (req, res) => {
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
});
```

## 📚 Lecture 057: Refactoring Our Routes

### 1. First Refactor:
```js
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
app.get('/api/v1/tours', getAllTours)
app.get('/api/v1/tours/:id', getTour);
app.patch('/api/v1/tours/:id', updateTour);
app.delete('/api/v1/tours/:id', deleteTour);
app.post('/api/v1/tours', createTour)

const PORT = 3000;
app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
```

### 2.  Second refactor:
```js
const express = require('express');
const app = express();
const fs = require('fs');
const fsPromises = require('fs').promises;

// using middleware to parse the body of the request
app.use(express.json());

/******************************\
|****** FUNCTIONs request *****|
\******************************/
...

const tours  = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8'));
//app.get('/api/v1/tours', getAllTours)
//app.get('/api/v1/tours/:id', getTour);
//app.patch('/api/v1/tours/:id', updateTour);
//app.delete('/api/v1/tours/:id', deleteTour);
//app.post('/api/v1/tours', createTour)

app
  .route('/api/v1/tours')
  .get(getAllTours)
  .post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

const PORT = 3000;
app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
```


## 📚 Lecture 0
## 📚 Lecture 0