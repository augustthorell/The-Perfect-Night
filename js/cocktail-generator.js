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

    let ingredientTitle = document.createElement("h3");
    ingredientTitle.innerHTML = "Ingredients:";
    ingredientTitle.id = "ingredient-title";
    drinkInfo.appendChild(ingredientTitle);

    for (let i = 1; i < 16; i++) {
        if (
            cocktail.drinks[0][`strIngredient${i}`] == null ||
            cocktail.drinks[0][`strIngredient${i}`] == ""
        ) {
            break;
        }

        let ingredient = document.createElement("list-item");
        ingredient.innerHTML =
            "-- " +
            cocktail.drinks[0][`strIngredient${i}`] +
            ": " +
            cocktail.drinks[0][`strMeasure${i}`] +
            "<br>";

        ingredient.className = "drink-ingredient";
        drinkInfo.appendChild(ingredient);
    }

    let ingredientDescriptio = document.createElement("h3");
    ingredientDescriptio.innerHTML = "<br>How to make it:";
    ingredientDescriptio.id = "ingredient-description";
    drinkInfo.appendChild(ingredientDescriptio);

    let recipe = document.createElement("h4");
    recipe.innerHTML = cocktail.drinks[0].strInstructions;

    recipe.id = "drink-recipe";
    drinkInfo.appendChild(recipe);
}