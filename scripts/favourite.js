import { favouriteMeals, mealsArray } from "../scripts/Store.js";

const cardsContainerFav = document.getElementById("main-container-fav");

function RenderFavouriteCards() {
  const favMeal = JSON.parse(localStorage.getItem("fav"));
  cardsContainerFav.innerHTML = "";
  //   console.log("local fav:", favMeal);
  //   console.log("favArray:", favouriteMeals);
  if (favMeal && favMeal.length !== 0) {
    favMeal.map((mealData) => {
      const { strMealThumb, strMeal, strArea, idMeal } = mealData;
      MealCard_fav(strMealThumb, strMeal, strArea, idMeal, mealData);
    });
  } else {
    InitalPalceholderText();
  }
}

function MealCard_fav(img, mealName, mealArea, mealId, mealData) {
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
  fav_img.src = `../media/svg/heart-fill.svg`;
  fav_img.className = "fav-button";
  fav_img.setAttribute("data-isFav", false);
  fav_img.alt = "fav icon";

  link.addEventListener("click", () => {
    localStorage.setItem("currentItem", JSON.stringify(mealData));
  });

  fav_img.addEventListener("click", () => {
    const favMealnew = JSON.parse(localStorage.getItem("fav"));
    const index = favMealnew.findIndex((ele) => ele.idMeal == mealId);
    favMealnew.splice(index, 1);

    localStorage.setItem("fav", JSON.stringify([...favMealnew]));
    // console.log("LOCAL FAV:", favMeal);

    // console.log(favouriteMeals);
    RenderFavouriteCards();
  });

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardText);
  cardBody.appendChild(link);
  cardBody.appendChild(fav_img);

  card.appendChild(imge);
  card.appendChild(cardBody);

  cardsContainerFav.appendChild(card);

  return card;
}

function InitalPalceholderText(string) {
  if (!string) {
    cardsContainerFav.innerHTML = `<h2 class="text-secondary">Nothing in Favourite Meals...</h2>`;
  } else {
    cardsContainerFav.innerHTML = `<h2 class="text-secondary">${string}</h2>`;
  }
}

InitalPalceholderText();

RenderFavouriteCards();
