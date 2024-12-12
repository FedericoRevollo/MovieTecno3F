const API_KEY = '2c1116c99676252050de0fe52b517061';
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=es-ES`;

async function fetchMovies() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Error en la solicitud a la API');
        }
        const data = await response.json();
        const moviesContainer = document.getElementById('movies');
        moviesContainer.innerHTML = ''; // Limpiar contenido anterior

        data.results.forEach(movie => {
            const movieElement = document.createElement('div');
            movieElement.innerHTML = `
                <h3>${movie.title}</h3>
                <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}" />
                <p>${movie.overview}</p>
            `;
            moviesContainer.appendChild(movieElement);
        });
    } catch (error) {
        console.error('Error fetching movies:', error);
        const moviesContainer = document.getElementById('movies');
        moviesContainer.innerHTML = '<p>No se pudieron cargar las películas. Inténtalo más tarde.</p>';
    }
}

fetchMovies();

// Validación del formulario
const form = document.getElementById('subscription-form');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');

    let isValid = true;

    // Validar nombre
    if (name.value.trim() === '') {
        nameError.textContent = 'El nombre es obligatorio';
        nameError.style.display = 'block';
        isValid = false;
    } else {
        nameError.style.display = 'none';
    }

    // Validar correo
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailPattern.test(email.value.trim())) {
        emailError.textContent = 'Ingrese un correo válido';
        emailError.style.display = 'block';
        isValid = false;
    } else {
        emailError.style.display = 'none';
    }

    // Si es válido, enviar
    if (isValid) {
        alert('Formulario enviado exitosamente');
        form.reset();
    }
});
