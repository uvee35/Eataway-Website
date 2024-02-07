$(document).ready(function () {
    const apiKey = "1";
    const searchInput = $("#searchInput");
    const searchResultsContainer = $("#searchResults");
    const imageContainer = $("#image");
    const recipeContainer = $("#recipe");
    const ingredientsContainer = $("#ingredients");
    const foodPlateContainer = $("#foodPlate");
    const foodTitle = $("#foodTitle");

    function clearPreviousData() {
        searchResultsContainer.empty();
        imageContainer.empty();
        recipeContainer.empty();
        ingredientsContainer.empty();
        foodPlateContainer.empty(); // Clear food plate container
    }

    function searchFood() {
        clearPreviousData();
        $('.recommended').hide();

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

                        const card = $("<div>").addClass("card mt-3");
                        const cardBody = $("<div>").addClass("card-body");
                        const cardTitle = $("<h5>").addClass("card-title").text(`${capitalizedMeal}`);
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

                // Clear previous data
                clearPreviousData();
                $('.recommended').hide();

                // Display meal name on top of the image
                const mealName = $("<h3>").addClass("text-center").text(meal.strMeal);
                recipeContainer.append(mealName);

                // Display meal image
                const mealImage = $("<img>").attr("src", meal.strMealThumb).attr("alt", meal.strMeal).addClass("img-thumbnail");
                imageContainer.append(mealImage);

                // Display recipe instructions without a list
                const instructions = meal.strInstructions.split('\n').filter(instruction => instruction.trim());
                recipeContainer.append("<h4>Recipe</h4>");
                instructions.forEach(instruction => {
                    recipeContainer.append($("<p>").text(instruction));
                });

                // Display ingredients
                const ingredientsWrapper = $("<div>").addClass("ingredient-wrapper");
                for (let i = 1; i <= 20; i++) {
                    const ingredient = meal[`strIngredient${i}`];
                    const measure = meal[`strMeasure${i}`];
                    if (ingredient && measure) {
                        const ingredientImage = $("<img>").addClass("ingredient-image").attr("src", `https://www.themealdb.com/images/ingredients/${ingredient}.png`).attr("alt", ingredient);
                        const ingredientText = $("<p>").addClass("ingredient-text").text(`${measure} ${ingredient}`);
                        const ingredientContainer = $("<div>").addClass("ingredient-container").append(ingredientImage, ingredientText);
                        ingredientsWrapper.append(ingredientContainer);
                    }
                }
                ingredientsContainer.append(ingredientsWrapper);
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
                    // Use displayFoodDetails to display the random food details
                    displayFoodDetails(randomFood.idMeal);
                } else {
                    recipeContainer.html("<p>Random meal could not be generated. Please try again later.</p>");
                }
                $('.reccommended').hide();
            })
            .catch(error => {
                console.error('Error fetching random food details:', error);
                recipeContainer.html("<p>Failed to fetch random food details. Please try again later.</p>");
            });
    }
    function createFoodPlateCard(meal) {
        const card = $("<div>").addClass("card mt-3 mx-3");
        const cardImage = $("<img>").addClass("card-img-top").attr("src", meal.strMealThumb).attr("alt", meal.strMeal);
        const cardBody = $("<div>").addClass("card-body");
        const cardTitle = $("<h5>").addClass("card-title").text(meal.strMeal);
        const cardCategory = $("<p>").addClass("card-text").text(meal.strCategory); 
    
        // Make the entire card clickable
        card.click(() => {
            displayFoodDetails(meal.idMeal); // Call displayFoodDetails function with meal ID
            $("#foodPlate").hide();
            $('.recommended').hide();
        });
    
        cardBody.append(cardTitle, cardCategory);
        card.append(cardImage, cardBody);
    
        return card;
    }
    

    function getFoodPlate() {
        const meals = [
            "Strawberries Romanoff",
            "Katsu Chicken Curry",
            "Pancakes",
            "New York Cheesecake",
        ];

        meals.forEach(mealName => {
            fetch(`https://www.themealdb.com/api/json/v1/${apiKey}/search.php?s=${mealName}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.meals && data.meals.length > 0) {
                        const meal = data.meals[0];
                        const card = createFoodPlateCard(meal);
                        foodPlateContainer.append(card); // Append the card to the foodPlateContainer
                    } else {
                        foodPlateContainer.append(`<p>No results found for ${mealName}</p>`);
                    }
                })
                .catch(error => {
                    console.error('Error searching for food:', error);
                    foodPlateContainer.append(`<p>Error fetching data for ${mealName}. Please try again later.</p>`);
                });
        });
    }

    getFoodPlate();
    // Event listeners
    $("#searchButton").click(searchFood);
    $("#randomButton").click(getRandomFood);
});
