const apiKey = "1";

function searchFood() {
    const searchInput = $("#searchInput").val();
    const searchResultsContainer = $("#searchResults");
    const mealDetailsContainer = $("#mealDetails");

    searchResultsContainer.html("");
    mealDetailsContainer.html("");

    if (searchInput.trim() !== "") {
        fetch(`https://www.themealdb.com/api/json/v1/${apiKey}/search.php?s=${searchInput}`)
            .then(response => response.json())
            .then(data => {
                if (data.meals) {
                    data.meals.forEach(meal => {
                        const listItem = $("<li>");
                        const link = $("<a>")
                            .attr("href", "#")
                            .text(meal.strMeal)
                            .click(() => displayFoodDetails(meal.idMeal));

                        listItem.append(link);
                        searchResultsContainer.append(listItem);
                    });
                } else {
                    searchResultsContainer.html("<p>No results found.</p>");
                }
            })
            .catch(error => console.error('Error searching for food:', error));
    } else {
        searchResultsContainer.html("<p>Please enter a search query.</p>");
    }
}

function displayFoodDetails(mealId) {
    const mealDetailsContainer = $("#mealDetails");

    fetch(`https://www.themealdb.com/api/json/v1/${apiKey}/lookup.php?i=${mealId}`)
        .then(response => response.json())
        .then(data => {
            const mealDetails = data.meals[0];
            const mealDetailsHTML = `
        <div>
        <h3 class="text-center">${mealDetails.strMeal}</h3>
        <div class="row">
            <img src="${mealDetails.strMealThumb}" alt="${mealDetails.strMeal}" class="img-thumbnail">
            <p>${mealDetails.strInstructions}</p>
            <h4>Ingredients:</h4>
            <ul>
            ${getIngredientsList(mealDetails)}
            </ul>
        </div>
        </div>
    `;

            mealDetailsContainer.html(mealDetailsHTML);
        })
        .catch(error => console.error('Error fetching meal details:', error));
}

function getRandomFood() {
    const randomFoodContainer = $("#randomFood");

    randomFoodContainer.html("");

    fetch(`https://www.themealdb.com/api/json/v1/${apiKey}/random.php`)
        .then(response => response.json())
        .then(data => {
            const randomFood = data.meals[0];
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

            randomFoodContainer.html(randomFoodHTML);
            $("#mealDetails").get(0).scrollIntoView({ behavior: "smooth" });
        })
        .catch(error => console.error('Error fetching random food details:', error));
}

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
