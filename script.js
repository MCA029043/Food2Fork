// Function to fetch recipes from the Forkify API
function fetchRecipes(searchQuery) {
    const API_URL = `https://forkify-api.herokuapp.com/api/search?q=${searchQuery}`;

    fetch(API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Assuming the API response has a 'recipes' property containing an array of recipe objects
            const recipes = data.recipes;
            displayRecipes(recipes);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

// Function to display recipes on the page
function displayRecipes(recipes) {
    const resultsContainer = document.getElementById('results');

    // Clear any previous search results
    resultsContainer.innerHTML = '';

    // Create a container for the recipe cards (grouped by rows)
    const recipeRows = document.createElement('div');
    recipeRows.classList.add('recipe-rows');
    
    let row = document.createElement('div');
    row.classList.add('recipe-row');

    recipes.forEach((recipe, index) => {
        // Create a card element for each recipe
        const card = document.createElement('div');
        card.classList.add('recipe-card');

        // Create an image element for the recipe
        const recipeImage = document.createElement('img');
        recipeImage.src = recipe.image_url;
        recipeImage.alt = recipe.title;

        // Create a title element for the recipe
        const recipeTitle = document.createElement('h3');
        recipeTitle.textContent = recipe.title;

        // Create a "Details" button for each recipe
        const detailsButton = document.createElement('button');
        detailsButton.classList.add('detail');
        detailsButton.textContent = 'Details';
        

        // Add an event listener to the "Details" button to navigate to the details page
        detailsButton.addEventListener('click', () => {
            // Redirect to the recipe details page with the recipe ID as a query parameter
            const recipeId = recipe.recipe_id;
            window.location.href = `page3.html?recipeId=${recipeId}`;
        });

        // Append elements to the card
        card.appendChild(recipeImage);
        card.appendChild(recipeTitle);
        card.appendChild(detailsButton);

        // Append the card to the current row
        row.appendChild(card);

        // Start a new row after every four items
        if ((index + 1) % 4 === 0) {
            recipeRows.appendChild(row);
            row = document.createElement('div');
            row.classList.add('recipe-row');
        }
    });

    // Append any remaining items in the last row
    if (row.childNodes.length > 0) {
        recipeRows.appendChild(row);
    }

    // Append the recipe rows to the results container
    resultsContainer.appendChild(recipeRows);
}

// Function to handle the search button click
function handleSearch() {
    const searchInput = document.getElementById('searchbox');
    const searchQuery = searchInput.value;

    if (searchQuery.trim() !== '') {
        // Call the fetchRecipes function with the search query
        fetchRecipes(searchQuery);
    }
}

// Add an event listener to the search button
const searchButton = document.getElementById('btn2');
searchButton.addEventListener('click', handleSearch);
