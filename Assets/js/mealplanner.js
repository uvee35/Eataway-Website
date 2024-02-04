var submitBtn = $("#submit-btn");

var mealPlanEL = $("#mealPlan");

var API_KEY = "c50b7ac84cab4508ab3fef9d10940ad4";
var apiURL = "https://api.spoonacular.com/mealplanner/generate";
var timeFrame = "week";


//1. Set variables for all the div tags ✅
//2. Fetch data from meal plan API ✅
//3. Create function to generate meal plan when submit button is clicked
//function must take in calorie intake, diet type, dietry requirements


submitBtn.on("click", generateMealPlan);
function generateMealPlan(event) {
    event.preventDefault();
    var calorieEL = $("#calorie-intake");
    var dietTypeEL = $("#dietType");
    var exclusionEL = $("#foodExclusions");

    var calories = calorieEL.val();
    var dietType = dietTypeEL.val().trim();
    var exclusion = exclusionEL.val().trim();

    console.log("button clicked");
    fetch(`${apiURL}?apiKey=${API_KEY}&timeFrame=${timeFrame}&exclusion=${exclusion}&calories=${calories}&diet=${dietType}`)
        .then(response => {
            console.log(response);
            // if (!response.ok) {
            //     throw new Error(`HTTP error!Status: ${ response.status }`);
            // }
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            displayMealPlan(data.week)
        })
    // .catch(error => console.error('Error:', error));
}

function createDayCard(dayData) {
    // console.log("Data:", data.week);
    // mealPlanEL.empty();

    // if (data.week && data.week.length > 0) {
        // $.each(data.we, function (index, item) {
            const card = $("<div>").addClass("card mt-3");
            const cardBody = $("<div>").addClass("card-body");
            const cardTitle = $("<h5>").addClass("card-title").text(`Day ${dayData.day}:`);
            // const cardText = $("<p>").addClass("card-text").text(day.description);

            const mealList = $("<ul>").addClass("list-group");
            // mealPlanEL.append(card);
            // cardBody.append(cardTitle, cardText);
            dayData.meals.forEach(meal => {
                const listItem = $("<li>").addClass("list-group-item");
                const mealLink = $("<a>").attr("href", meal.sourceUrl).text(meal.title);
                listItem.append(mealLink);
                mealList.append(listItem);
            });
                card.append(mealList)
                card.append(cardBody);

                return card;
            }
            
    // } else {
    //     mealPlanEL.text('No results found.');
    // }


    function displayMealPlan(data) {
        console.log("Data:", data);
        mealPlanEL.empty();
    
        if (data && Object.keys(data).length > 0) {
            Object.keys(data).forEach(day => {
                const card = createDayCard(data[day]);
                mealPlanEL.append(card);
            });
        } else {
            mealPlanEL.text('No results found.');
        }
    }
