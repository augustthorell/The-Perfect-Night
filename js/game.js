const startGameButton = document.getElementById("start-game");
const questionBox = document.querySelector(".game-question");
let gameOverText = document.querySelector(".game-over-text");
let modalBackground = document.querySelector(".input_div");
let buttonTrue = document.getElementById("True");
let buttonFalse = document.getElementById("False");
let buttonRestart = document.getElementById("restart");
var btn = document.getElementById("start-game");
let correctAnswer;

btn.onclick = function() {
    modal.style.display = "block";
};

function randomTimer() {
    gameOverText.style.display = "none";
    buttonTrue.style.display = "block";
    buttonFalse.style.display = "block";
    questionBox.style.display = "block";
    buttonRestart.style.display = "none";

    getQuestion();
    //let randomTime = Math.floor(Math.random() * 120000) + 10000;
    let randomTime = Math.floor(Math.random() * 5000) + 1000;
    setTimeout(function() {
        gameOverText.style.display = "block";
        buttonTrue.style.display = "none";
        buttonFalse.style.display = "none";
        buttonRestart.style.display = "block";
        questionBox.style.display = "none";

    }, randomTime);
}

function getQuestion() {
    questionBox.innerHTML = "";
    fetch("https://opentdb.com/api.php?amount=1&type=boolean")
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
        modalBackground.style.background = "#2a8c2f";
    } else {
        modalBackground.style.background = "#a32428";
    }
    setTimeout(getQuestion, 500, true);
}

startGameButton.addEventListener("click", randomTimer);
buttonRestart.addEventListener('click', randomTimer);
buttonTrue.addEventListener("click", checkAnswer);
buttonFalse.addEventListener("click", checkAnswer);