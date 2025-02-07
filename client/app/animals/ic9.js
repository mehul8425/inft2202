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
    const nameCell = row.insertCell(0);
    const speciesCell = row.insertCell(1);
    const ageCell = row.insertCell(2);

    nameCell.textContent = animal.name;
    speciesCell.textContent = animal.species;
    ageCell.textContent = animal.age;
  });
}

// Fetch animals using XMLHttpRequest
function xhrAnimals() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "animals.json", true);

    // Using load event
    xhr.addEventListener("load", function () {
        if (xhr.status === 200) {
            const animals = JSON.parse(xhr.responseText);
            drawAnimalsTable(animals);
        }
    });

    xhr.send();
}

// Fetch animals using Fetch API with Promises
function fetchAnimalsPromise() {
    fetch("animals.json")
        .then(response => response.json())
        .then(data => drawAnimalsTable(data))
        .catch(error => console.error("Error fetching animals:", error));
}

// Fetch animals using Fetch API with async/await
async function fetchAnimalsAsync() {
    try {
        const response = await fetch("animals.json");
        const data = await response.json();
        drawAnimalsTable(data);
    } catch (error) {
        console.error("Error fetching animals:", error);
    }
}

// Render table using XMLHttpRequest method
function renderXhrPage() {
    xhrAnimals();
}

// Render table using Fetch API with Promises
function renderSyncPage() {
    fetchAnimalsPromise();
}

// Render table using Fetch API with async/await
function renderAsyncPage() {
    fetchAnimalsAsync();
}

// Pagination functions
function drawPaginationLinks(animals) {
    const paginationControls = document.getElementById("paginationControls");
    paginationControls.innerHTML = "";

    const totalPages = Math.ceil(animals.length / itemsPerPage);
    
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");
        button.textContent = i;
        button.onclick = () => changePage(i, animals);
        paginationControls.appendChild(button);
    }
}

function changePage(page, animals) {
    currentPage = page;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    drawAnimalsTable(animals.slice(startIndex, endIndex));
}

const itemsPerPage = 10;
let currentPage = 1;

// Uncomment one method to render table by default
// renderXhrPage();
// renderSyncPage();
renderAsyncPage();
