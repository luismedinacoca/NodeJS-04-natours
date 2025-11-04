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




## 📚 Lecture 0