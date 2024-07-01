import { favouriteMeals, mealsArray } from "./Store.js";
import { RerenderDOM } from "./mainScript.js";

const searchInputElement = document.getElementById("search");
const submitButtonElement = document.getElementById("submit-button");
const cardsContainer = document.getElementById("main-container");

function MealCard(img, mealName, mealArea, mealId, mealData) {
  // Create the card div and set its class
  const card = document.createElement("div");
  card.className = "card";
  card.style.width = "18rem";

  // Create the image element and set its attributes
  const imge = document.createElement("img");
  imge.src = `${img}`;
  imge.alt = "meal image";

  // Create the card body div and set its class
  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  // Create the title element and set its class and text
  const cardTitle = document.createElement("h5");
  cardTitle.className = "card-title";
  cardTitle.textContent = `${mealName}`;

  // Create the paragraph element and set its class and text
  const cardText = document.createElement("p");
  cardText.className = "card-text";
  cardText.textContent = `${mealArea}`;

  // Create the link element and set its class and text
  const link = document.createElement("a");
  link.href = `./MealDetail.html?mealId=${mealId}`;
  link.className = "btn btn-secondary";
  link.textContent = "See meal";

  const fav_img = document.createElement("img");
  fav_img.src = `../media/svg/heart.svg`;
  fav_img.className = "fav-button";
  fav_img.setAttribute("data-isFav", false);
  fav_img.alt = "fav icon";

  link.addEventListener("click", () => {
    localStorage.setItem("currentItem", JSON.stringify(mealData));
  });

  fav_img.addEventListener("click", () => {
    console.log(fav_img.getAttribute("data-isFav"));

    if (fav_img.getAttribute("data-isFav") == "false") {
      fav_img.src = `../media/svg/heart-fill.svg`;
      fav_img.setAttribute("data-isFav", true);

      favouriteMeals.push(mealData);
      localStorage.setItem("fav", JSON.stringify([...favouriteMeals]));
    } else {
      fav_img.src = `../media/svg/heart.svg`;

      const index = favouriteMeals.findIndex((ele) => ele.idMeal == mealId);
      favouriteMeals.splice(index, 1);

      const favMealnew = JSON.parse(localStorage.getItem("fav"));
      localStorage.setItem("fav", JSON.stringify([...favouriteMeals]));

      fav_img.setAttribute("data-isFav", false);
    }

    console.log(favouriteMeals);
  });

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardText);
  cardBody.appendChild(link);
  cardBody.appendChild(fav_img);

  card.appendChild(imge);
  card.appendChild(cardBody);

  cardsContainer.appendChild(card);

  return card;
}

function InitalPalceholderText(string) {
  if (!string) {
    cardsContainer.innerHTML = `<h2 class="text-secondary">Search Your Meal to see results...</h2>`;
  } else {
    cardsContainer.innerHTML = `<h2 class="text-secondary">${string}</h2>`;
  }
}

export {
  searchInputElement,
  submitButtonElement,
  cardsContainer,
  MealCard,
  InitalPalceholderText,
};
