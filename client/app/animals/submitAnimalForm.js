document.getElementById('submitAnimalForm').addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newAnimal = new Animal(Object.fromEntries(formData.entries()));

    try {
        AnimalService.createAnimal(newAnimal);
        document.getElementById('message').innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirecting...';
        setTimeout(() => {
            window.location.href = 'list.html';
        }, 3000);
    } catch (error) {
        document.getElementById('errorMessage').innerText = error.message;
    }
});