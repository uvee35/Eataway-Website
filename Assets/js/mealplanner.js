var submitBtn = $("#submit-btn");
var calorieEL = $("#calorie-intake");
var dietTypeEL = $("#dietType");
var exclusionEL = $("#foodExclusions");

var API_KEY = "c50b7ac84cab4508ab3fef9d10940ad4";
var apiURL = "https://api.spoonacular.com/mealplanner/generate";
var timeFrame = "week";
var calories = calorieEL.val();
var dietType = dietTypeEL.val().trim();
var exclusion = ["eggs"];


//1. Set variables for all the div tags ✅
//2. Fetch data from meal plan API 
//3. Create function to generate meal plan when submit button is clicked
//function must take in calorie intake, diet type, dietry requirements

// submitBtn.on("click", generateMealPlan);
// function getExclusions () {
//     var exclusionEL = $("#foodExclusions");
//     if (exclusionEL.val().trim() !== "") {
//         exclusion.push(exclusionEL.val());
//     }
// }
submitBtn.on("click", generateMealPlan);
function generateMealPlan(event) {
    event.preventDefault();
    console.log("button clicked");
    fetch(`${apiURL}?apiKey=${API_KEY}&timeFrame=${timeFrame}&exclusion=${exclusion}`)
    .then(response => {
        console.log(response);
        // if (!response.ok) {
        //     throw new Error(`HTTP error!Status: ${ response.status }`);
        // }
        return response.json();
    })
    .then(function (data) {
        console.log(data)
     //call function to display data
    })
    // .catch(error => console.error('Error:', error));
}


