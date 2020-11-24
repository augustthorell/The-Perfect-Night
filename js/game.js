const startGameButton = document.getElementById('start-game');

function randomTimer() {
    getQuestion();
    // let randomTime = (Math.floor(Math.random * 120000) + 10000);
    let randomTime = (Math.floor(Math.random() * 5000) + 1000);
    setTimeout(function() {
        console.log('You lose, loser');
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

                displayQuestion(data.results[0]);
            });
        })
        .catch(function(err) {
            console.log("Fetch Error :-S", err);
        });
}


function displayQuestion(question) {
    console.log(question.question);
    console.log(question.correct_answer);
}

startGameButton.addEventListener('click', randomTimer);