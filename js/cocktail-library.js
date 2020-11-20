let test = document.getElementById('cocktail');
const testBtn = document.getElementById('search');
let drinkInfo = document.getElementById("drink-info");


testBtn.addEventListener('click', getLibrary);

function getLibrary() {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + test.value)
        .then(function(response) {
            if (response.status !== 200) {
                console.log(
                    "Looks like there was a problem. Status Code: " + response.status
                );
                return;
            }

            response.json().then(function(data) {
                console.log(data)
                clearcontent();
                for (let i = 0; i < data.drinks.length; i++) {
                    displayLibrary(data.drinks[i])

                }
            });
        })
        .catch(function(err) {
            console.log("Fetch Error :-S", err);
        });
}

function clearcontent() {
    drinkInfo.innerHTML = "";
}

function displayLibrary(cocktail) {
    // console.log(cocktail.drinks[0].strDrink);

    let drinkName = document.createElement("h2");
    drinkName.innerHTML = cocktail.strDrink;

    drinkName.id = "drink-name";
    drinkInfo.appendChild(drinkName);

    let img = document.createElement("img");
    img.src = cocktail.strDrinkThumb;
    img.id = "cocktail-image";
    drinkInfo.appendChild(img);

    let ingredientTitle = document.createElement("h3");
    ingredientTitle.innerHTML = "Ingredients:";
    ingredientTitle.id = "ingredient-title";
    drinkInfo.appendChild(ingredientTitle);

    for (let i = 1; i < 16; i++) {
        if (
            cocktail[`strIngredient${i}`] == null ||
            cocktail[`strIngredient${i}`] == ""
        ) {
            break;
        }
        if (cocktail[`strMeasure${i}`] == null ||
            cocktail[`strMeasure${i}`] == "") {
            cocktail[`strMeasure${i}`] = ' ';
        }

        let ingredient = document.createElement("list-item");
        ingredient.innerHTML =
            "-- " +
            cocktail[`strIngredient${i}`] +
            ": " +
            cocktail[`strMeasure${i}`] +
            "<br>";

        ingredient.className = "drink-ingredient";
        drinkInfo.appendChild(ingredient);
    }

    let ingredientDescriptio = document.createElement("h3");
    ingredientDescriptio.innerHTML = "<br>How to make it:";
    ingredientDescriptio.id = "ingredient-description";
    drinkInfo.appendChild(ingredientDescriptio);

    let recipe = document.createElement("recipe");
    recipe.innerHTML = cocktail.strInstructions;

    recipe.id = "drink-recipe";
    drinkInfo.appendChild(recipe);
}



/*
$(document).ready(function() {
    $("#search").click(function() {
        $.ajax({
            method: "GET",
            url: "https://www.thecocktaildb.com/api/json/v1/1/search.php?i=vodka",
            data: {
                query: $("#drink").val(),
            },
        }).done(function(msg) {
            console.log(msg);
            for (var i = 0; i < 10; i++) {
                console.log(msg.drinks[i].strDrinkThumb);
                console.log(msg.drinks[i].strDrink);
                $("p").append(
                    "<img src='" + msg.drinks[i].strDrinkThumb + "'/>" + "<br>"
                );
                $("p").append(
                    "<strong>" + msg.drinks[i].strDrink + "</strong>" + "<br><br>"
                );
            }
        });
    });
});
*/