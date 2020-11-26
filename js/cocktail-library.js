let test = document.getElementById('cocktail');
const searchName = document.getElementById('search-name');
const searchIngredient = document.getElementById('search-ingredient');
let drinkInfo = document.getElementById("drink-info");
let drinkCards = document.querySelectorAll('.drink-card');
var span = document.getElementsByClassName("close")[0];
var modal = document.getElementById("myModal");
let modalDrink = document.querySelector('.library-modal');

searchName.addEventListener('click', getLibrary);
searchIngredient.addEventListener('click', getLibrary);


function getLibrary() {
    if (this.id === "search-name") {
        fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + test.value)
            .then(function(response) {
                if (response.status !== 200) {
                    console.log(
                        "Looks like there was a problem. Status Code: " + response.status
                    );
                    return;
                }

                response.json().then(function(data) {
                    clearcontent();
                    for (let i = 0; i < data.drinks.length; i++) {
                        displayLibrary(data.drinks[i])
                    }
                    let drinkCards = document.querySelectorAll('.drink-card');
                    for (let i = 0; i < drinkCards.length; i++) {
                        drinkCards[i].addEventListener('click', getCardInformation);
                    }
                });
            })
            .catch(function(err) {
                console.log("Fetch Error :-S", err);
            });
    } else if (this.id === "search-ingredient") {
        fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + test.value)
            .then(function(response) {
                if (response.status !== 200) {
                    console.log(
                        "Looks like there was a problem. Status Code: " + response.status
                    );
                    return;
                }

                response.json().then(function(data) {
                    clearcontent();
                    for (let i = 0; i < data.drinks.length; i++) {
                        displayLibrary(data.drinks[i])
                    }
                    let drinkCards = document.querySelectorAll('.drink-card');
                    for (let i = 0; i < drinkCards.length; i++) {
                        drinkCards[i].addEventListener('click', getCardInformation);
                    }
                });
            })
            .catch(function(err) {
                console.log("Fetch Error :-S", err);
            });
    }
}

function getCardInformation() {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + this.id)
        .then(function(response) {
            if (response.status !== 200) {
                console.log(
                    "Looks like there was a problem. Status Code: " + response.status
                );
                return;
            }

            response.json().then(function(data) {

                modal.style.display = "block";
                fillModal(data.drinks[0]);

            });
        })
        .catch(function(err) {
            console.log("Fetch Error :-S", err);
        });
}



function clearcontent() {
    drinkInfo.innerHTML = "";
}

function clearCard() {
    let drinkModal = document.querySelector('.drink-modal');
    drinkModal.remove();
}

span.onclick = function() {
    modal.style.display = "none";
    clearCard();
};

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        clearCard();
    }
};




function fillModal(cocktail) {

    // Creates a div that wrappes the fetched information
    let drinkCard = document.createElement("div");
    drinkCard.className = "drink-modal";
    drinkCard.id = cocktail.idDrink;
    modalDrink.appendChild(drinkCard);

    // Creates the wrapper for the title 
    let titleWrapper = document.createElement("div");
    titleWrapper.className = "title-wrapper";
    drinkCard.appendChild(titleWrapper);

    // Writes out the Title of the drink
    let drinkName = document.createElement("h2");
    drinkName.innerHTML = cocktail.strDrink;
    drinkName.className = "drink-name-library";
    titleWrapper.appendChild(drinkName);

    // Creates the image
    let img = document.createElement("img");
    img.src = cocktail.strDrinkThumb;
    img.className = "cocktail-image-library";
    drinkCard.appendChild(img);

    let ingredientTitle = document.createElement("h3");
    ingredientTitle.innerHTML = "Ingredients:";
    ingredientTitle.id = "ingredient-title";
    drinkCard.appendChild(ingredientTitle);

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

        let ingredient = document.createElement("h4");
        ingredient.innerHTML =
            "-- " +
            cocktail[`strIngredient${i}`] +
            ": " +
            cocktail[`strMeasure${i}`] +
            "<br>";

        ingredient.className = "drink-ingredient";
        drinkCard.appendChild(ingredient);
    }

    let ingredientDescriptio = document.createElement("h3");
    ingredientDescriptio.innerHTML = "<br>How to make it:";
    ingredientDescriptio.id = "ingredient-description";
    drinkCard.appendChild(ingredientDescriptio);

    let recipe = document.createElement("h4");
    recipe.innerHTML = cocktail.strInstructions;

    recipe.id = "drink-recipe";
    drinkCard.appendChild(recipe);

}

function displayLibrary(cocktail) {
    // Creates a div that wrappes the fetched information
    let drinkCard = document.createElement("div");
    drinkCard.className = "drink-card";
    drinkCard.id = cocktail.idDrink;
    drinkInfo.appendChild(drinkCard);

    // Creates the wrapper for the title 
    let titleWrapper = document.createElement("div");
    titleWrapper.className = "title-wrapper";
    drinkCard.appendChild(titleWrapper);

    // Writes out the Title of the drink
    let drinkName = document.createElement("h2");
    drinkName.innerHTML = cocktail.strDrink;
    drinkName.className = "drink-name-library";
    titleWrapper.appendChild(drinkName);

    // Creates the image
    let img = document.createElement("img");
    img.src = cocktail.strDrinkThumb;
    img.className = "cocktail-image-library";
    drinkCard.appendChild(img);    
}
