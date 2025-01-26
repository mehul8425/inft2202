/*
name : mehual jodhani
date : 2024/01/17
file : create.js
*/

console.log('we are on the add page');

// assign a handler to the submit event
document.getElementById('animal-form')
    .addEventListener('submit', submitAnimalForm);

// create a handler to deal with the submit event
async function submitAnimalForm ( event ) {
    // prevent the default action from happening
    event.preventDefault();
    // get a reference to the form (from the event)
    const animalForm = event.target;  
    // validate the form
    const valid = validateAnimalForm(animalForm);
    // do stuff if the form is valid
    if (valid) {
        console.log('we\'re good');
        
        const formData = new FormData(animalForm);
        // create a javascript object to hold the form data
        const animalObject = {};
        formData.forEach((value, key) => {
            // by default, a value from form is string
            // we need to convert them accordingly
            if(key === 'eyes' || key ==='legs'){
                animalObject[key] = Number(value);
            } else {
                animalObject[key] = value;
            }
        });

        const eleNameError = animalForm.name.nextElementSibling;
        try {
            if (animalObject.id) {
                // Update existing animal
                await animalService.updateAnimal(animalObject);
            } else {
                // Create a new animal
                await animalService.saveAnimal(animalObject);
            }

            eleNameError.classList.add('d-none');
            animalForm.reset();
            window.location = './list.html';  // Redirect to animal list page after submission
        } catch (error) {
            console.error(error);
            eleNameError.classList.remove('d-none');
            eleNameError.textContent = "This animal already exists!";
        }        
    // do nothing if it's not
    } else {
        console.log('form is invalid');
    }
}

// validate the animal form
function validateAnimalForm ( form ) {
    console.log('validating');
    let valid = true;
    // test that name is valid
    const name = form.name.value;
    const eleNameError = form.name.nextElementSibling;
    if (name === "") {
        eleNameError.classList.remove('d-none');
        eleNameError.textContent = "You must name this animal!";
        valid = false;
    } else {
        eleNameError.classList.add('d-none');
    }
    // add validation for other fields if necessary
    // return if the form is valid or not
    return valid;
}

// Handle URL parameters to configure form for editing
const urlParams = new URLSearchParams(window.location.search);
const animalId = urlParams.get('id');

if (animalId) {
    setupEditForm(animalId);
}

// Set up form for editing an existing animal
async function setupEditForm(id) {
    const heading = document.querySelector('#formHeading');
    heading.textContent = 'Edit Animal';

    try {
        const animal = await animalService.findAnimal(id);  // Fetch the animal by id
        const form = document.querySelector('#animal-form');

        // Set form values to the animal's properties
        form.querySelector('#name').value = animal.name;
        form.querySelector('#species').value = animal.species;
        form.querySelector('#eyes').value = animal.eyes;
        form.querySelector('#legs').value = animal.legs;
        // Add other fields as necessary

        form.querySelector('#name').disabled = true;  // Disable the name field for editing
    } catch (error) {
        console.error('Error setting up the form:', error);
    }
}
