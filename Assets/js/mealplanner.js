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
    var messageContainer = $("#message-container");

    var calories = calorieEL.val();
    var dietType = dietTypeEL.val().trim();
    var exclusion = exclusionEL.val().trim();

    // if(!calories){
    //     messageContainer.text("Please enter a calorie value before generating the meal plan!");
    //     return;
    // } else {
    //     messageContainer.text("");
    // }
    //having issues with getting this part to work

    console.log("button clicked");
    fetch(`${apiURL}?apiKey=${API_KEY}&timeFrame=${timeFrame}&exclusion=${exclusion}&calories=${calories}&diet=${dietType}`)
        .then(response => {
            console.log(response);
        
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            displayMealPlan(data.week)
        })
    .catch(error => console.error('Error:', error));
}

function createDayCard(day, dayData) {
   
            const capitalizedDay = day.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
            const card = $("<div>").addClass("card mt-3");
            const cardBody = $("<div>").addClass("card-body");
            const cardTitle = $("<h5>").addClass("card-title").text(`${capitalizedDay}:`);
            

            const mealList = $("<ul>").addClass("list-group");
        
            dayData.meals.forEach(meal => {
                const listItem = $("<li>").addClass("list-group-item");
                const mealLink = $("<a>").attr({
                    "href": meal.sourceUrl,
                    "target": "_blank" 
                }).text(meal.title);
                listItem.append(mealLink);
                mealList.append(listItem);
            });
                card.append(cardTitle,mealList)
                card.append(cardBody);

                return card;
            }
  


    function displayMealPlan(data) {
        console.log("Data:", data);
        mealPlanEL.empty();
    
        if (data && Object.keys(data).length > 0) {
            Object.entries(data).forEach(([day, dayData]) => {
                const card = createDayCard(day, dayData);
                mealPlanEL.append(card);
            });
        } else {
            mealPlanEL.text('No results found.');
        }
    }
