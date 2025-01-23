function AnimalService() {
    if (!localStorage.getItem('animals')) {
        localStorage.setItem('animals', JSON.stringify([]));
    }
}

AnimalService.prototype.listAnimals = function() {
    return JSON.parse(localStorage.getItem('animals')).map(animal => new Animal(animal));
};

AnimalService.prototype.findAnimal = function(id) {
    const animals = this.listAnimals();
    const animal = animals.find(a => a.id === id);
    if (!animal) throw new Error("That animal doesn't exist!");
    return animal;
};

AnimalService.prototype.createAnimal = function(animal) {
    const animals = this.listAnimals();
    if (animals.some(a => a.name === animal.name)) {
        throw new Error('That animal already exists!');
    }
    animals.push(animal);
    localStorage.setItem('animals', JSON.stringify(animals));
    return true;
};

export default new AnimalService();