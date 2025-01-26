/*
name : mehual jodhani
date : 2024/01/21
file : submitAnimalForm.js
*/

// Attach an event listener to handle the form submission when the 'submitAnimalForm' form is submitted
document.getElementById('submitAnimalForm').addEventListener('submit', event => {
    // Prevent the default form submission behavior (such as page reload)
    event.preventDefault();

    // Create a FormData object from the submitted form
    const formData = new FormData(event.target);
    
    // Convert form data into an object and create a new Animal instance
    const newAnimal = new Animal(Object.fromEntries(formData.entries()));

    try {
        // Attempt to save the new animal using the AnimalService
        AnimalService.createAnimal(newAnimal);

        // Show a loading spinner and message indicating redirection is in progress
        document.getElementById('message').innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirecting...';

        // Redirect to the animal list page after a 3-second delay
        setTimeout(() => {
            window.location.href = 'list.html';
        }, 3000);

    } catch (error) {
        // Display an error message if the animal creation fails
        document.getElementById('errorMessage').innerText = error.message;
    }
});
