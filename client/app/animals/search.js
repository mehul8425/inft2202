/*
name : mehual jodhani
date : 2024/01/17
file : search.js
*/

// Import the animals service
import { getAnimals, deleteAnimal } from '../animals.service.js';  // Modify to import deleteAnimal
import { waitTho } from '../utils.js'; // Import waitTho function

// Function to toggle the visibility of the table and message box
function toggleTableVisibility(animals) {
  const messageBox = document.getElementById('message-box');
  const animalsList = document.getElementById('animals-list');

  if (animals.length > 0) {
    messageBox.classList.add('d-none');
    animalsList.classList.remove('d-none');
    drawAnimalsTable(animals);
  } else {
    messageBox.classList.remove('d-none');
    animalsList.classList.add('d-none');
  }
}

// Function to dynamically draw rows in the animals table
function drawAnimalsTable(animals) {
  const tbody = document.querySelector('#animals-list tbody');
  tbody.innerHTML = ''; // Clear existing rows

  animals.forEach(animal => {
    const row = tbody.insertRow();
    const ownerCell = row.insertCell(0);
    const detailsCell = row.insertCell(1);
    const controlsCell = row.insertCell(2);

    ownerCell.textContent = animal.owner;
    detailsCell.textContent = animal.details;

    // Create Edit button
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('btn', 'btn-warning', 'mr-2');
    controlsCell.appendChild(editButton);

    // Create Delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('btn', 'btn-danger');
    controlsCell.appendChild(deleteButton);

    // Add delete functionality
    deleteButton.addEventListener('click', async (event) => {
      event.preventDefault();

      // Disable the delete button and change text
      deleteButton.disabled = true;
      deleteButton.innerHTML = `<span class="spinner-border spinner-border-sm"></span> Deleting...`;

      try {
        // Wait 3 seconds before deleting
        await waitTho(3000);
        
        await deleteAnimal(animal); // Call delete method from service
        
        // Fetch updated animals list and update UI
        getAnimals().then(updatedAnimals => {
          toggleTableVisibility(updatedAnimals);  // Redraw table with updated list
        });
      } catch (error) {
        console.error('Error deleting animal:', error);
      } finally {
        // Enable button back if error occurs
        deleteButton.disabled = false;
        deleteButton.textContent = 'Delete';
      }
    });
  });
}

// Fetch the animals data on page load and toggle visibility
window.onload = async () => {
  const spinner = document.getElementById('loading-spinner');

  // Show the spinner
  spinner.style.display = "block";

  // Wait 3 seconds before showing animals
  await waitTho(3000);

  // Fetch and display animals
  getAnimals().then(animals => {
    toggleTableVisibility(animals);
    // Hide the spinner after loading data
    spinner.style.display = "none";
  });
};
