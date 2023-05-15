let results = document.getElementById("resultsContainer");
let searchBtn = document.getElementById("search_button");
let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

searchBtn.addEventListener("click", () => {
  let userInput = document.getElementById("userInput").value;

  if (userInput.length == 0) {
    results.innerHTML = `Please enter something or press random! <button class='btn-primary'>Random</button>`;
  } else {
    fetch(url + userInput)
      .then((response) => response.json())
      .then((data) => {
        let myMeal = data.meals[0];
        console.log(myMeal);
        // console.log(myMeal.strMealThumb);
        // console.log(myMeal.strMeal);
        // console.log(myMeal.strArea);
        // console.log(myMeal.strInstructions);
        let count = 1;
        let ingredients = [];
        for (let i in myMeal) {
          let ingredient = "";
          let measurements = "";
          if (i.startsWith("strIngredient") && myMeal[i]) {
            ingredient = myMeal[i];
            // console.log(ingredient);
            measurements = myMeal[`strMeasure` + count];
            count += 1;
            // console.log(measure);
            ingredients.push(`${measurements} ${ingredient}`);
          }
        }
        results.innerHTML = `
      <img src=${myMeal.strMealThumb} class='img-fluid w-25 h-25 mx-auto d-block p-2'/>
      <div class="details">
        <h2 class='badge bg-primary text-uppercase fs-3'>${myMeal.strMeal}</h2>
        <h2 >Origin: ${myMeal.strArea}</h2>
        <p>Main ingredients: ${myMeal.strCategory}
      </div>
      <div id='ingredient-container'></div>
      <div id='recipe'>
        <button class='btn btn-danger' id='hide-recipe'>x</button>
        <div id='instructions'>${myMeal.strInstructions}</div>
        </div>
        <button class='btn btn-success' id='show-recipe'>View recipe</button>
        <a class='btn btn-primary' href='${myMeal.strYoutube}'>Watch Video</a>
        `;

        let ingredientContainer = document.getElementById(
          "ingredient-container"
        );
        let parent = document.createElement("ul");
        let recipe = document.getElementById("recipe");
        let hideRecipe = document.getElementById("hide-recipe");
        let showRecipe = document.getElementById("show-recipe");

        ingredients.forEach((i) => {
          let child = document.createElement("li");
          child.innerText = i;
          parent.appendChild(child);
          ingredientContainer.appendChild(parent);
          hideRecipe.style.display = "none";
          recipe.style.display = "none";
          // showRecipe.style.display = "none";
        });

        hideRecipe.addEventListener("click", () => {
          recipe.style.display = "none";
          showRecipe.style.display = "block";
        });
        showRecipe.addEventListener("click", () => {
          recipe.style.display = "block";
          hideRecipe.style.display = "block";
          showRecipe.style.display = "none";
        });
        // console.log(ingredients);
      })
      .catch(() => {
        results.innerHTML = `<h2>Could not find a dish with that name. Please try again!</h2>`;
      });
  }
});
