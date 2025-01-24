/*
name : mehual jodhani
date : 2024/01/21
file : create.js
*/



/*
 * AnimalService constructor function to initialize animal data in local storage.
 */
function AnimalService() {
    // Check if 'animals' entry exists in local storage
    if (!localStorage.getItem('animals')) {
        // If not found, initialize it with an empty array
        localStorage.setItem('animals', JSON.stringify([]));
    }
}

/*
 * Retrieves a list of all animals stored in local storage.
 * Maps the raw data to instances of the Animal class.
 * 
 * @returns {Array} List of Animal objects
 */
AnimalService.prototype.listAnimals = function() {
    // Parse animal data from local storage and convert to Animal instances
    return JSON.parse(localStorage.getItem('animals')).map(animal => new Animal(animal));
};

/*
 * Finds an animal by its unique ID.
 * 
 * @param {string} id - The unique identifier of the animal to find.
 * @returns {Object} The found Animal object.
 * @throws {Error} If no animal with the given ID exists.
 */
AnimalService.prototype.findAnimal = function(id) {
    // Get the list of animals
    const animals = this.listAnimals();
    
    // Find the animal with the specified ID
    const animal = animals.find(a => a.id === id);
    
    // Throw an error if the animal is not found
    if (!animal) throw new Error("That animal doesn't exist!");
    
    return animal;
};

/*
 * Adds a new animal to the local storage after ensuring no duplicate names.
 * 
 * @param {Object} animal - The animal object to add.
 * @returns {boolean} True if the animal was added successfully.
 * @throws {Error} If an animal with the same name already exists.
 */
AnimalService.prototype.createAnimal = function(animal) {
    // Get the list of current animals
    const animals = this.listAnimals();
    
    // Check if an animal with the same name already exists
    if (animals.some(a => a.name === animal.name)) {
        throw new Error('That animal already exists!');
    }
    
    // Add the new animal to the list
    animals.push(animal);
    
    // Save the updated list back to local storage
    localStorage.setItem('animals', JSON.stringify(animals));
    
    return true;  // Indicate success
};

// Export an instance of AnimalService to be used across the application
export default new AnimalService();
