const apiKey = "1";
const searchInput = $("#searchInput");
const searchResultsContainer = $("#searchResults");
const imageContainer = $("#image");
const recipeContainer = $("#recipe");
const ingredientsContainer = $("#ingredients");

function clearPreviousData() {
    searchResultsContainer.empty();
    imageContainer.empty();
    recipeContainer.empty();
    ingredientsContainer.empty();
}

function searchFood() {
    clearPreviousData();

    const input = searchInput.val().trim();
    if (!input) {
        searchResultsContainer.html("<p>Please enter a search query.</p>");
        return;
    }

    fetch(`https://www.themealdb.com/api/json/v1/${apiKey}/search.php?s=${input}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.meals) {
                data.meals.forEach(meal => {
                    const capitalizedMeal = meal.strMeal.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                    
                    const card = $("<div>").addClass("card mt-3")
                    const cardBody = $("<div>").addClass("card-body");
                    const cardTitle = $("<h5>").addClass("card-title").text(`${capitalizedMeal}:`)
                    const mealList = $("<ul>").addClass("list-group");
                    const listItem = $("<li>").addClass("list-group-item");
                    const mealLink = $("<a>").addClass("card-link").attr({
                        "href": "#", // Change to meal details link if available
                    }).text("View Details").click(() => {
                        displayFoodDetails(meal.idMeal);
                        $(".card").remove(); // Remove all card elements when any card is clicked
                    });
                    listItem.append(mealLink);
                    mealList.append(listItem);
            
                    cardBody.append(cardTitle, mealList);
                    card.append(cardBody);
            
                    searchResultsContainer.append(card);
                });

                // Scroll to the top of the search results container
                searchResultsContainer.scrollTop(0);
            } else {
                searchResultsContainer.html("<p>No results found.</p>");
            }
            
        })
        .catch(error => {
            console.error('Error searching for food:', error);
            searchResultsContainer.html("<p>Something went wrong. Please try again later.</p>");
        });
}



function displayFoodDetails(mealId) {
    fetch(`https://www.themealdb.com/api/json/v1/${apiKey}/lookup.php?i=${mealId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const meal = data.meals[0];
            if (!meal) {
                throw new Error('Meal not found');
            }

            // Display meal image
            imageContainer.html(`<img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="img-thumbnail">`);

            // Display meal name
            recipeContainer.html(`<h3 class="text-center">${meal.strMeal}</h3>`);

            // Display recipe instructions
            const instructions = meal.strInstructions.split('\n').filter(instruction => instruction.trim());
            recipeContainer.append("<h4>Recipe:</h4>")
                .append($("<ul>").append(instructions.map(instruction => $("<li>").text(instruction))));

            // Display ingredients
            const ingredients = [];
            for (let i = 1; i <= 20; i++) {
                const ingredient = meal[`strIngredient${i}`];
                const measure = meal[`strMeasure${i}`];
                if (ingredient && measure) {
                    ingredients.push(`${measure} ${ingredient}`);
                }
            }
            ingredientsContainer.html(`<h4>Ingredients:</h4><p>${ingredients.join('</p><p>')}</p>`);
        })
        .catch(error => {
            console.error('Error fetching meal details:', error);
            recipeContainer.html("<p>Meal details not found. Please try again later.</p>");
        });
}

function getRandomFood() {
    clearPreviousData();

    fetch(`https://www.themealdb.com/api/json/v1/${apiKey}/random.php`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const randomFood = data.meals[0];
            if (randomFood) {
                // Display meal image
                imageContainer.html(`<img src="${randomFood.strMealThumb}" alt="${randomFood.strMeal}" class="img-thumbnail">`);

                // Display meal name
                recipeContainer.html(`<h3 class="text-center">${randomFood.strMeal}</h3>`);

                // Display meal instructions
                const instructions = randomFood.strInstructions.split('\n').filter(instruction => instruction.trim());
                recipeContainer.append("<h4>Recipe:</h4>")
                    .append($("<ul>").append(instructions.map(instruction => $("<li>").text(instruction))));

                // Display ingredients
                const ingredients = [];
                for (let i = 1; i <= 20; i++) {
                    const ingredient = randomFood[`strIngredient${i}`];
                    const measure = randomFood[`strMeasure${i}`];
                    if (ingredient && measure) {
                        ingredients.push(`${measure} ${ingredient}`);
                    }
                }
                ingredientsContainer.html(`<h4>Ingredients:</h4><p>${ingredients.join('</p><p>')}</p>`);
            } else {
                recipeContainer.html("<p>Random food not found. Please try again later.</p>");
            }
        })
        .catch(error => {
            console.error('Error fetching random food details:', error);
            recipeContainer.html("<p>Failed to fetch random food details. Please try again later.</p>");
        });
}

// Event listeners
$("#searchButton").click(searchFood);
$("#randomButton").click(getRandomFood);