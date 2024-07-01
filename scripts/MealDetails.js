const currentMeal = JSON.parse(localStorage.getItem("currentItem"));

const mealImage = document.getElementById("meal-image");
const mealTitle = document.getElementById("meal-title");
const mealDesc = document.getElementById("meal-desc");
const mealArea = document.getElementById("meal-area");

mealImage.src = currentMeal.strMealThumb;
mealTitle.innerText = currentMeal.strMeal;
mealDesc.innerText = currentMeal.strInstructions;
mealArea.innerText = currentMeal.strArea;
