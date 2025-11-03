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


## 📚 Lecture 05





