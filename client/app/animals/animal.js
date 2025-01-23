export default class Animal {
    constructor({ id = null, name, breed, eyes, legs, sound }) {
        this.id = id ? id : crypto.randomUUID();
        this.name = name;
        this.breed = breed;
        this.eyes = eyes;
        this.legs = legs;
        this.sound = sound;
    }

    toString() {
        return `${this.name} is a ${this.breed} with ${this.eyes} eyes and ${this.legs} legs. It makes a '${this.sound}' sound.`;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            breed: this.breed,
            eyes: this.eyes,
            legs: this.legs,
            sound: this.sound
        };
    }
}