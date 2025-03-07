const express = require('express');
const animalRouter = express.Router();

// GET - Search all animals
animalRouter.get('/', (req, res) => {
    res.send('Search animals');
});

// GET - Find an animal by ID
animalRouter.get('/:id', (req, res) => {
    res.send(`Find animal with id: ${req.params.id}`);
});

// POST - Create an animal
animalRouter.post('/', (req, res) => {
    res.send('Create animal');
});

// PUT - Update an animal by ID
animalRouter.put('/:id', (req, res) => {
    res.send(`Update animal with id: ${req.params.id}`);
});

// DELETE - Delete an animal by ID
animalRouter.delete('/:id', (req, res) => {
    res.send(`Delete animal with id: ${req.params.id}`);
});

module.exports = animalRouter;
