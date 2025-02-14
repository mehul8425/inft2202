/*
name : Mehual Jodhani
date : 2024/01/17
file : animal.service.js
*/

const API_BASE_URL = "https://inft2202.opentech.durhamcollege.org/api/animals";
const API_KEY = "6813e6a5-77b4-4bdd-b47f-d3ffcd3c74aa" ; // 

// Function to get all animals (from API or localStorage)
export async function getAnimals(page = 1, perPage = 5) {
    try {
        const response = await fetch(`${API_BASE_URL}?page=${page}&perPage=${perPage}`, {
            method: "GET",
            headers: {
                apikey: API_KEY,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Error fetching animals: ${response.status} - ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("API Error:", error);
        console.warn("Falling back to localStorage");
        return JSON.parse(localStorage.getItem("animals")) || [];
    }
}

// Function to find a specific animal by ID
export async function findAnimal(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: "GET",
            headers: {
                apikey: API_KEY,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Animal not found");
        }

        return await response.json();
    } catch (error) {
        console.error("API Error:", error);
        console.warn("Falling back to localStorage");
        const animals = JSON.parse(localStorage.getItem("animals")) || [];
        const animal = animals.find(animal => animal.id === id);
        if (!animal) {
            throw new Error("Animal not found");
        }
        return animal;
    }
}

// Function to update an existing animal (API first, then localStorage)
export async function updateAnimal(updatedAnimal) {
    try {
        const response = await fetch(`${API_BASE_URL}/${updatedAnimal.id}`, {
            method: "PUT",
            headers: {
                apikey: API_KEY,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedAnimal),
        });

        if (!response.ok) {
            throw new Error("Failed to update animal");
        }

        return true;
    } catch (error) {
        console.error("API Error:", error);
        console.warn("Updating localStorage instead");
        const animals = JSON.parse(localStorage.getItem("animals")) || [];
        const index = animals.findIndex(animal => animal.id === updatedAnimal.id);
        if (index === -1) {
            throw new Error("Animal not found for update");
        }
        animals[index] = updatedAnimal;
        localStorage.setItem("animals", JSON.stringify(animals));
        return true;
    }
}

// Function to delete an animal (API first, then localStorage)
export async function deleteAnimal(animalToDelete) {
    try {
        const response = await fetch(`${API_BASE_URL}/${animalToDelete.id}`, {
            method: "DELETE",
            headers: {
                apikey: API_KEY,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to delete animal");
        }

        return true;
    } catch (error) {
        console.error("API Error:", error);
        console.warn("Deleting from localStorage instead");
        const animals = JSON.parse(localStorage.getItem("animals")) || [];
        const index = animals.findIndex(animal => animal.id === animalToDelete.id);
        if (index === -1) {
            throw new Error("Animal not found for deletion");
        }
        animals.splice(index, 1);
        localStorage.setItem("animals", JSON.stringify(animals));
        return true;
    }
}
