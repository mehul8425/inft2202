/*
name : Mehual Jodhani
date : 2024/01/17
file : list.js
*/ 

import * as animalService from "./animal.service.js";

console.log('we are on the list page');

// Get table elements
const eleEmpty = document.getElementById('empty-message');
const eleTable = document.getElementById('animal-list');
const tableBody = eleTable.querySelector("tbody");
const spinner = document.getElementById('loading-spinner');
const perPageSelect = document.getElementById("perPageSelect");
const pagination = document.getElementById("pagination");

// Get URL parameters for pagination
const urlParams = new URLSearchParams(window.location.search);
let page = parseInt(urlParams.get("page")) || 1;
let perPage = parseInt(urlParams.get("perPage")) || 5;

// Function to Fetch and Display Data
async function fetchAndRenderAnimals() {
    try {
        spinner.style.display = "block";
        tableBody.innerHTML = "";
        eleTable.classList.add('d-none');
        eleEmpty.classList.add('d-none');

        const animals = await animalService.getAnimals(page, perPage);

        spinner.style.display = "none";

        if (!animals.length) {
            eleEmpty.classList.remove('d-none');
            return;
        }

        eleTable.classList.remove('d-none');
        drawAnimalTable(animals);
        updatePagination();
    } catch (error) {
        console.error("Failed to load animals:", error);
        spinner.style.display = "none";
        eleEmpty.textContent = "Failed to load animals. Please try again.";
        eleEmpty.classList.remove('d-none');
    }
}

// Function to draw the table dynamically
function drawAnimalTable(animals) {
    tableBody.innerHTML = ""; // Clear existing rows

    for (let animal of animals) {
        const row = tableBody.insertRow();
        
        row.insertCell().textContent = animal.name;
        row.insertCell().textContent = animal.breed;
        row.insertCell().textContent = animal.legs;
        row.insertCell().textContent = animal.eyes;
        row.insertCell().textContent = animal.sound;

        // Create button cell
        const eleBtnCell = row.insertCell();
        
        // Delete button
        const eleBtnDelete = document.createElement('button');
        eleBtnDelete.classList.add('btn', 'btn-danger', 'mx-1');
        eleBtnDelete.innerHTML = `<i class="fa fa-trash"></i>`;
        eleBtnDelete.addEventListener('click', () => onDeleteButtonClick(animal));

        // Edit button
        const eleBtnEdit = document.createElement('a');
        eleBtnEdit.classList.add('btn', 'btn-primary', 'mx-1');
        eleBtnEdit.innerHTML = `<i class="fa fa-user"></i>`;
        eleBtnEdit.href = `./add.html?name=${animal.name}`;

        // Append buttons to cell
        eleBtnCell.append(eleBtnDelete, eleBtnEdit);
    }
}

// Function to delete an animal
async function onDeleteButtonClick(animal) {
    try {
        await animalService.deleteAnimal(animal);
        fetchAndRenderAnimals(); // Refresh without reloading
    } catch (error) {
        console.error("Failed to delete animal:", error);
        alert("Failed to delete animal. Please try again.");
    }
}

// Update Pagination UI
function updatePagination() {
    pagination.innerHTML = `
        <button onclick="changePage(${page - 1})" ${page === 1 ? "disabled" : ""}>Previous</button>
        <span>Page ${page}</span>
        <button onclick="changePage(${page + 1})">Next</button>
    `;
}

// Change Page
function changePage(newPage) {
    if (newPage < 1) return;
    page = newPage;
    updateURL();
    fetchAndRenderAnimals();
}

// Change Per Page
perPageSelect.addEventListener("change", (event) => {
    perPage = parseInt(event.target.value);
    page = 1; // Reset to page 1 when perPage changes
    updateURL();
    fetchAndRenderAnimals();
});

// Update URL Bar
function updateURL() {
    const newUrl = `?page=${page}&perPage=${perPage}`;
    window.history.pushState({}, "", newUrl);
}

// Initial Load
fetchAndRenderAnimals();
