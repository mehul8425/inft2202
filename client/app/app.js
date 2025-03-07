/*
name : mehual jodhani
date : 2024/01/17
file : app.js
*/


const express = require('express');
const app = express();
const port = 3000;

const mainRouter = require('./server/routes/router');
const animalRouter = require('./server/routes/animals');

app.use(express.json());
app.use('/', mainRouter);
app.use('/animals', animalRouter);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

