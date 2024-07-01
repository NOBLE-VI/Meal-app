import {
  searchInputElement,
  submitButtonElement,
  cardsContainer,
  MealCard,
  InitalPalceholderText,
} from "./DOMScript.js";
import { mealsArray } from "./Store.js";
import { updateDebounceText } from "./services.js";

const fav_button = document.querySelector(".fav-button");

const API = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

searchInputElement.addEventListener("input", (e) => {
  if (e.target.value !== "") updateDebounceText(e.target.value);
});

function RerenderDOM() {
  console.log("DOM RE-RENDERED");
  cardsContainer.innerHTML = "";

  if (mealsArray.length !== 0) {
    mealsArray.map((mealData) => {
      const { strMealThumb, strMeal, strArea, idMeal } = mealData;
      MealCard(strMealThumb, strMeal, strArea, idMeal, mealData);
    });
  } else {
    InitalPalceholderText();
  }
}

RerenderDOM();

export { RerenderDOM };
