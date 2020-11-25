const startGameButton = document.getElementById("start-game");
const questionBox = document.querySelector(".game-question");
let gameOverText = document.querySelector(".game-over-text");
let modalBackground = document.querySelector(".input_div");
let buttonTrue = document.getElementById("True");
let buttonFalse = document.getElementById("False");

let correctAnswer;

function randomTimer() {
    gameOverText.style.display = "none";
    buttonTrue.style.display = "block";
    buttonFalse.style.display = "block";
    questionBox.style.display = "block";

    getQuestion();
    // let randomTime = (Math.floor(Math.random * 120000) + 10000);
    let randomTime = Math.floor(Math.random() * 5000) + 1000;
    setTimeout(function() {
        gameOverText.style.display = "block";
        buttonTrue.style.display = "none";
        buttonFalse.style.display = "none";
        questionBox.style.display = "none";

    }, randomTime);
}

function getQuestion() {

    fetch("https://opentdb.com/api.php?amount=1&difficulty=easy&type=boolean")
        .then(function(response) {
            if (response.status !== 200) {
                console.log(
                    "Looks like there was a problem. Status Code: " + response.status
                );
                return;
            }

            response.json().then(function(data) {
                //console.log(data);
                modalBackground.style.background = "#364c59";
                displayQuestion(data.results[0].question);
                correctAnswer = data.results[0].correct_answer;
            });
        })
        .catch(function(err) {
            console.log("Fetch Error :-S", err);
        });
}

function displayQuestion(question) {
    questionBox.innerHTML = question;
}

function checkAnswer() {
    if (this.id == correctAnswer) {
        console.log("You answered Correctly");
        modalBackground.style.background = "#2a8c2f";
    } else {
        console.log("You answered Wrong");
        modalBackground.style.background = "#a32428";
    }
    setTimeout(getQuestion, 500, true);
}

startGameButton.addEventListener("click", randomTimer);
buttonTrue.addEventListener("click", checkAnswer);
buttonFalse.addEventListener("click", checkAnswer);

// Popup
var modal = document.getElementById("myModal");
var btn = document.getElementById("start-game");
var span = document.getElementsByClassName("close")[0];

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