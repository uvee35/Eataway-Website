// TheMealDB API key (replace with your actual API key)
const apiKey = "1";

// Function to search for food
function searchFood() {
    const searchInput = document.getElementById("searchInput").value;
    const searchResultsContainer = document.getElementById("searchResults");
    const mealDetailsContainer = document.getElementById("mealDetails");
    console.log("searchFood function called");
    searchResultsContainer.innerHTML = "";
    mealDetailsContainer.innerHTML = "";

    if (searchInput.trim() !== "") {
        fetch(`https://www.themealdb.com/api/json/v1/${apiKey}/search.php?s=${searchInput}`)
            .then(response => response.json())
            .then(data => {
                if (data.meals) {
                    data.meals.forEach(meal => {
                        const listItem = document.createElement("li");
                        const link = document.createElement("a");

                        link.href = "#";
                        link.addEventListener("click", () => displayFoodDetails(meal.idMeal));

                        link.textContent = meal.strMeal;

                        listItem.appendChild(link);
                        searchResultsContainer.appendChild(listItem);
                    console.log(data);
                    });
                } else {
                    searchResultsContainer.innerHTML = "<p>No results found.</p>";
                }
            })
            .catch(error => console.error('Error searching for food:', error));
    } else {
        searchResultsContainer.innerHTML = "<p>Please enter a search query.</p>";
    }
}

// Function to display food details (for both search and random)
function displayFoodDetails(mealId) {
    const mealDetailsContainer = document.getElementById("mealDetails");

    // API call to get meal details
    fetch(`https://www.themealdb.com/api/json/v1/${apiKey}/lookup.php?i=${mealId}`)
        .then(response => response.json())
        .then(data => {
            const mealDetails = data.meals[0];

            // Create HTML elements to display meal details
            const mealDetailsHTML = `
                <div>
                    <h3>${mealDetails.strMeal}</h3>
                    <img src="${mealDetails.strMealThumb}" alt="${mealDetails.strMeal}" class="img-thumbnail">
                    <p>${mealDetails.strInstructions}</p>
                    <h4>Ingredients:</h4>
                    <ul>
                        ${getIngredientsList(mealDetails)}
                    </ul>
                </div>
            `;

            // Display meal details in the container
            mealDetailsContainer.innerHTML = mealDetailsHTML;
        })
        .catch(error => console.error('Error fetching meal details:', error));
}

// Function to generate random food
function getRandomFood() {
    console.log("getRandomFood function called");
    const randomFoodContainer = document.getElementById("randomFood");

    // Clear previous content
    randomFoodContainer.innerHTML = "";

    fetch(`https://www.themealdb.com/api/json/v1/${apiKey}/random.php`)
        .then(response => response.json())
        .then(data => {
            const randomFood = data.meals[0];

            // Create HTML elements to display random food details
            const randomFoodHTML = `
                <div>
                    <h3>${randomFood.strMeal}</h3>
                    <img src="${randomFood.strMealThumb}" alt="${randomFood.strMeal}" class="img-thumbnail">
                    <p>${randomFood.strInstructions}</p>
                    <h4>Ingredients:</h4>
                    <ul>
                        ${getIngredientsList(randomFood)}
                    </ul>
                </div>
            `;

            // Display random food details in the container
            randomFoodContainer.innerHTML = randomFoodHTML;

            // Optionally, you can scroll to the meal details section for better visibility
            document.getElementById("mealDetails").scrollIntoView({ behavior: "smooth" });
        })
        .catch(error => console.error('Error fetching random food details:', error));
}

// Additional function to get ingredients list
function getIngredientsList(foodDetails) {
    const ingredientsList = [];

    for (let i = 1; i <= 20; i++) {
        const ingredient = foodDetails[`strIngredient${i}`];
        const measure = foodDetails[`strMeasure${i}`];

        if (ingredient && measure) {
            ingredientsList.push(`<li>${measure} ${ingredient}</li>`);
        }
    }

    return ingredientsList.join("");
}
