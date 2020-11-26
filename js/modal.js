// Popup
var modal = document.getElementById("myModal");

var span = document.getElementsByClassName("close")[0];
var drinkCard = document.querySelector('drink-card');




span.onclick = function() {
    modal.style.display = "none";
};

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
("");