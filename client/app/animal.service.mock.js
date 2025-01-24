/*
name : mehual jodhani
date : 2024/01/17
file : animal.service.mock.js
*/

// AnimalService constructor function to initialize the local storage if not already set
function AnimalService() {
    // Check if 'animals' entry exists in local storage
    if (!localStorage.getItem('animals')) {
        // If not, initialize it with an empty array
        localStorage.setItem('animals', JSON.stringify([]));
    }    
}

/*
 * Retrieves the list of animals from local storage
 */
AnimalService.prototype.getAnimals = function() {
    // Parse and return the stored animal list from local storage
    return JSON.parse(localStorage.getItem('animals'));
}

/*
 * Saves a new animal to local storage after checking for duplicates
 */
AnimalService.prototype.saveAnimal = function(animal) {
    // Get the current list of animals
    const animals = this.getAnimals();
    
    // Check if an animal with the same name already exists
    if (animals.find(a => a.name == animal.name)) {
        // Throw an error to indicate duplicate entry
        throw new Error('An animal with that name already exists!');
    }

    // Add the new animal to the list
    animals.push(animal);
    
    // Update local storage with the new list
    localStorage.setItem('animals', JSON.stringify(animals));
    
    // Return success response
    return true;
}

/*
 * Placeholder method for finding an animal (not yet implemented)
 */
AnimalService.prototype.findAnimal = function(animalName) {
    return null;  // Returns null for now
}

/*
 * Placeholder method for updating an animal (not yet implemented)
 */
AnimalService.prototype.updateAnimal = function(animal) {
    return false;  // Returns false for now
}

/*
 * Deletes an animal from the local storage
 */
AnimalService.prototype.deleteAnimal = function(animal) {
    // Get the current list of animals
    const animals = this.getAnimals();
    
    // Find the index of the animal to be deleted
    const idx = animals.findIndex(a => a.name == animal.name);
    
    // If the animal is not found, throw an error
    if (idx === -1) {
        throw new Error('That animal does not exist!');
    }

    // Remove the animal from the array
    animals.splice(idx, 1);
    
    // Update the local storage with the modified list
    localStorage.setItem('animals', JSON.stringify(animals));
    
    // Return success response
    return true;
}

// Create an instance of AnimalService for use throughout the application
const animalService = new AnimalService();

// Re-initialize the AnimalService constructor to prevent redundant storage checks
function AnimalService() {
    if (!localStorage.getItem('animals')) {
        localStorage.setItem('animals', JSON.stringify([]));
    }
}

/*
 * Returns a list of animal objects mapped to the Animal class
 */
AnimalService.prototype.listAnimals = function() {
    // Retrieve the animals from local storage and map to Animal instances
    return JSON.parse(localStorage.getItem('animals')).map(animal => new Animal(animal));
};

/*
 * Finds an animal by its unique ID
 */
AnimalService.prototype.findAnimal = function(id) {
    // Get the list of animals
    const animals = this.listAnimals();
    
    // Find the animal with the matching ID
    const animal = animals.find(a => a.id === id);
    
    // Throw an error if the animal is not found
    if (!animal) throw new Error("That animal doesn't exist!");
    
    return animal;
};

/*
 * Creates a new animal after checking for duplicate names
 */
AnimalService.prototype.createAnimal = function(animal) {
    // Get the list of animals
    const animals = this.listAnimals();
    
    // Check if an animal with the same name already exists
    if (animals.some(a => a.name === animal.name)) {
        throw new Error('That animal already exists!');
    }
    
    // Add the new animal to the list
    animals.push(animal);
    
    // Update the local storage
    localStorage.setItem('animals', JSON.stringify(animals));
    
    return true;
};

// Export an instance of AnimalService for use in other modules
export default new AnimalService();
