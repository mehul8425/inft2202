/*
name : mehual jodhani
date : 2024/01/21
file : create.js
*/

// Exporting the Animal class as a default export, making it available for import in other files.
export default class Animal {
    // Constructor to initialize an Animal object with properties
    constructor({ id = null, name, breed, eyes, legs, sound }) {
        // If id is provided, use it; otherwise, generate a unique identifier
        this.id = id ? id : crypto.randomUUID();
        this.name = name;   // The name of the animal
        this.breed = breed; // The breed/type of the animal
        this.eyes = eyes;   // Number of eyes the animal has
        this.legs = legs;   // Number of legs the animal has
        this.sound = sound; // Sound the animal makes
    }

    // Method to return a string representation of the animal
    toString() {
        return `${this.name} is a ${this.breed} with ${this.eyes} eyes and ${this.legs} legs. It makes a '${this.sound}' sound.`;
    }

    // Method to convert the animal object into a JSON representation
    toJSON() {
        return {
            id: this.id,      // Unique identifier of the animal
            name: this.name,  // Name of the animal
            breed: this.breed,// Breed/type of the animal
            eyes: this.eyes,  // Number of eyes
            legs: this.legs,  // Number of legs
            sound: this.sound // Sound the animal makes
        };
    }
}
