import { mealsArray } from "./Store.js";
import { RerenderDOM } from "./mainScript.js";
import { InitalPalceholderText } from "./DOMScript.js";

//fetch Meal function
async function fetchMeal(query) {
  const data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
  );
  const rawData = await data.json();
  return rawData;
}

const updateDebounceText = debounce((searchString) => {
  // console.log(e);

  fetchMeal(searchString)
    .then((res) => {
      console.log("RES:", res["meals"]);
      if (res["meals"]) {
        mealsArray.length = 0; //clearing mealsArray  to store new results

        if (mealsArray.length === 0) {
          console.log("MELAS PUSHED");
          mealsArray.push(...res["meals"]);
        }
        RerenderDOM();
      } else {
        InitalPalceholderText("Nothing found ....  :(");
      }
      console.log("MealsArray", mealsArray);
    })
    .catch((err) => {
      console.log(err);
    });
});

function debounce(cb, delay = 1000) {
  let timeout;
  return (...args) => {
    clearInterval(timeout);
    timeout = setTimeout(() => {
      cb(...args);
    }, delay);
  };
}

export { updateDebounceText };
