const generatorBtn = document.getElementById("generator");
let drinkInfo = document.getElementById("drink-info");

function getRandomeCocktail() {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
        .then(function(response) {
            if (response.status !== 200) {
                console.log(
                    "Looks like there was a problem. Status Code: " + response.status
                );
                return;
            }

            response.json().then(function(data) {
                clearcontent();
                displayRandomCocktail(data);
            });
        })
        .catch(function(err) {
            console.log("Fetch Error :-S", err);
        });
}

generatorBtn.addEventListener("click", getRandomeCocktail);

function clearcontent() {
    drinkInfo.innerHTML = "";
}

function displayRandomCocktail(cocktail) {
    // console.log(cocktail.drinks[0].strDrink);

    let drinkName = document.createElement("h2");
    drinkName.innerHTML = cocktail.drinks[0].strDrink;

    drinkName.id = "drink-name";
    drinkInfo.appendChild(drinkName);

    let img = document.createElement("img");
    img.src = cocktail.drinks[0].strDrinkThumb;
    img.id = "cocktail-image";
    drinkInfo.appendChild(img);

    let recipieWrapper = document.createElement("div");
    recipieWrapper.className = "recipe-wrapper";
    drinkInfo.appendChild(recipieWrapper);

    let ingredientTitle = document.createElement("h3");
    ingredientTitle.innerHTML = "Ingredients:";
    ingredientTitle.id = "ingredient-title";
    recipieWrapper.appendChild(ingredientTitle);

    for (let i = 1; i < 16; i++) {
        if (
            cocktail.drinks[0][`strIngredient${i}`] == null ||
            cocktail.drinks[0][`strIngredient${i}`] == ""
        ) {
            break;
        }
        if (
            cocktail.drinks[0][`strMeasure${i}`] == null ||
            cocktail.drinks[0][`strMeasure${i}`] == ""
        ) {
            cocktail.drinks[0][`strMeasure${i}`] = " ";
        } else {
            cocktail.drinks[0][`strMeasure${i}`] = ": " + cocktail.drinks[0][`strMeasure${i}`];
        }

        let ingredient = document.createElement("h4");
        ingredient.innerHTML =
            "-- " +
            cocktail.drinks[0][`strIngredient${i}`] +
            " " +
            cocktail.drinks[0][`strMeasure${i}`] +
            "<br>";

        ingredient.className = "drink-ingredient";
        recipieWrapper.appendChild(ingredient);
    }

    let descriptionWrapper = document.createElement("div");
    descriptionWrapper.className = "description-wrapper";
    drinkInfo.appendChild(descriptionWrapper);

    let ingredientDescription = document.createElement("h3");
    ingredientDescription.innerHTML = "<br>How to make it:";
    ingredientDescription.id = "ingredient-description";
    descriptionWrapper.appendChild(ingredientDescription);

    let recipe = document.createElement("h4");
    recipe.innerHTML = cocktail.drinks[0].strInstructions;

    recipe.id = "drink-recipe";
    descriptionWrapper.appendChild(recipe);
}