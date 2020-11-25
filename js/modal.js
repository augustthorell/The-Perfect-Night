// Popup
var modal = document.getElementById("myModal");
var btn = document.getElementById("start-game");
var span = document.getElementsByClassName("close")[0];
var drinkCard = document.querySelector('drink-card');



/* for (let i = 0; i > drinkCard.length; i++) {
    drinkCard.addEventListener('click', function() {
        modal.style.display = "block";
    });
} */




/* function openModal() {
    console.log(this);

} */


btn.onclick = function() {
    modal.style.display = "block";
};

span.onclick = function() {
    modal.style.display = "none";
};

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
("");