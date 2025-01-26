/*
name : Mehual Jodhani
date : 2024/01/17
file : animal.service.js
*/

// Function to get all animals from localStorage (or API)
export function getAnimals() {
    return new Promise((resolve) => {
        const animals = JSON.parse(localStorage.getItem('animals')) || [];
        resolve(animals);
    });
}

// Function to find a specific animal by ID
function findAnimal(id) {
    const animals = JSON.parse(localStorage.getItem('animals')) || [];
    const animal = animals.find(animal => animal.id === id);
    if (!animal) {
        throw new Error('Animal not found');
    }
    return animal;
}

// Function to update an existing animal
function updateAnimal(updatedAnimal) {
    const animals = JSON.parse(localStorage.getItem('animals')) || [];
    const index = animals.findIndex(animal => animal.id === updatedAnimal.id);
    if (index === -1) {
        throw new Error('Animal not found for update');
    }
    animals[index] = updatedAnimal;
    localStorage.setItem('animals', JSON.stringify(animals));
    return true;
}

// Function to delete an animal from localStorage
function deleteAnimal(animalToDelete) {
    const animals = JSON.parse(localStorage.getItem('animals')) || [];
    const index = animals.findIndex(animal => animal.id === animalToDelete.id);
    if (index === -1) {
        throw new Error('Animal not found for deletion');
    }
    animals.splice(index, 1); // Remove the animal
    localStorage.setItem('animals', JSON.stringify(animals));
    return true;
}
