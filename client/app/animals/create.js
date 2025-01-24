/*
name : mehual jodhani
date : 2024/01/21
file : create.js
*/
import AnimalService from './animals/animal.Service.mock.js';
import Animal from './animals/Animal.js';

// Log the current page to the console for debugging purposes
console.log('We are on the add page');

// Attach an event listener to handle form submission
document.getElementById('animal-form')
    .addEventListener('submit', submitAnimalForm);

// Function to handle the form submission event
async function submitAnimalForm(event) {
    // Prevent the default form submission behavior (e.g., page reload)
    event.preventDefault();
    
    // Get the form element from the event object
    const animalForm = event.target;  
    
    // Validate the form inputs
    const valid = validateAnimalForm(animalForm);
    
    // Proceed only if the form is valid
    if (valid) {
        console.log('Form validation passed');
        
        // Collect form data into a FormData object
        const formData = new FormData(animalForm);
        
        // Convert form data to a JavaScript object
        const animalObject = {};
        formData.forEach((value, key) => {
            // Convert numeric values, otherwise keep as string
            if (key === 'eyes' || key === 'legs') {
                animalObject[key] = Number(value);
            } else {
                animalObject[key] = value;
            }
        });

        const eleNameError = animalForm.name.nextElementSibling;

        try {
            // Attempt to save the animal data using the service
            await AnimalService.saveAnimal(animalObject);
            
            // Hide the error message if it was previously displayed
            eleNameError.classList.add('d-none');
            
            // Reset the form after successful submission
            animalForm.reset();
            
            // Redirect to the animal list page
            window.location = './list.html';
        } catch (error) {
            console.error('Error saving animal:', error);
            
            // Show an error message if saving fails
            eleNameError.classList.remove('d-none');
            eleNameError.textContent = "This animal already exists!";
        }
    } else {
        console.log('Form validation failed');
    }
}

// Function to validate the form inputs
function validateAnimalForm(form) {
    console.log('Validating form...');
    
    let valid = true;
    
    // Validate the 'name' field
    const name = form.name.value;
    const eleNameError = form.name.nextElementSibling;
    
    if (name.trim() === "") {
        eleNameError.classList.remove('d-none');
        eleNameError.textContent = "You must name this animal!";
        valid = false;
    } else {
        eleNameError.classList.add('d-none');
    }

    // Additional field validation can be added here

    // Return the overall validation result
    return valid;
}
