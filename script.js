'use strict';

// Define initial variables for the game.
let min = 0, max = 20;
let numberToGuess = Math.floor(Math.random() * (max - min + 1)) + min;
let score = 20, highScore = 0, tempScore = 20;
let flagToClose = true;

// Add event listeners to various elements in the HTML document.
document.querySelector(".check").addEventListener("click", checkPress);
document.querySelector(".again").addEventListener("click", againPress);
document.querySelector(".setting").addEventListener("click", openSetting);
document.querySelector(".close").addEventListener("click", closeModel);
document.getElementById("blurModal").addEventListener("click", closeModel);
document.querySelector(".save").addEventListener("click", savePress);

// Add keyboard event listeners for the 'Escape' key and 'Enter' key.
document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
        closeModel();
    }
    if (e.key === "Enter") {
        savePress();
    }
});

// Function to handle the 'Save' button click in the settings modal.
function savePress() {
    let scoreDemo = 0, minDemo = 0, maxDemo = 0;
    let scoreElement = document.getElementById("newScore").value;
    let minElement = document.getElementById("newMin").value;
    let maxElement = document.getElementById("newMax").value;

    // Check if a valid score is entered, else use the previous score.
    if (scoreElement !== "") {
        scoreDemo = Number(scoreElement);
    } else {
        scoreDemo = tempScore;
    }

    // Check if the entered score is greater than or equal to 1.
    if (scoreDemo < 1) {
        displayMessage("messageSetting", "🛑 Score must be 1 or more...");
        flagToClose = false;
    } else {
        score = scoreDemo;
        tempScore = scoreDemo;
        againPress();
    }

    // Check if valid minimum and maximum values are entered.
    if (minElement !== "") {
        minDemo = Number(minElement);
    } else {
        minDemo = min;
    }
    if (maxElement !== "") {
        maxDemo = Number(maxElement);
    } else {
        maxDemo = max;
    }

    // Check if min is less than max.
    if (minDemo >= maxDemo) {
        displayMessage("messageSetting", "🛑 Min must be less than Max...");
        flagToClose = false;
    } else {
        min = minDemo;
        max = maxDemo;
        document.querySelector('.between').innerHTML = `(Between ${min} and ${max})`;
        againPress();
    }

    // Close the settings modal if there are no errors.
    if (flagToClose) {
        closeModel();
    }
    flagToClose = true;
}

// Function to open the settings modal.
function openSetting() {
    settingsModal.style.display = "block";
    blurModal.style.display = "block";
}

// Function to reset the game.
function againPress() {
    document.querySelector('.score').textContent = tempScore;
    score = tempScore;
    //new number to guess
    numberToGuess = Math.floor(Math.random() * (max - min + 1)) + min;
    //reset the bg color.
    document.querySelector("body").style.backgroundColor = '#222';
    document.querySelector(".number").textContent = "?";
    //reset the msg.
    displayMessage("message", "Start guessing...");
    document.querySelector(".guess").value = "";
}

// Function to handle the 'Check' button click.
function checkPress() {
    const numberUser = Number(document.querySelector(".guess").value);
    if (score > 0) {
        //check if the user enter a valid number.
        if (!numberUser) {
            displayMessage("message", "⚠ No Number!");
            //check if the number that the user pick is in the range , In order not to waste a turn.
        } else if (numberUser < min || numberUser > max) {
            displayMessage("message", "⚠ Number is not in the range!");
            // if the user guess the right number.
        } else if (numberToGuess === numberUser) {
            displayMessage("message", "🏆 Correct! You win!");
            document.querySelector("body").style.backgroundColor = '#79AC78';
            document.querySelector(".number").textContent = numberToGuess;
            if (highScore < score) {
                highScore = score;
            }
            document.querySelector(".highscore").textContent = highScore;
            score = -1;
            // if the user do not guess the right number. he get a relevent msg high or low.
        } else if (numberUser !== numberToGuess) {
            displayMessage("message", numberUser > numberToGuess ? "📈 Too High!" : "📉 Too Low!");
            pointReduction();
        }
    }
}

// Function to display messages.
function displayMessage(obj, msg) {
    document.querySelector(`.${obj}`).textContent = msg;
}

// Function to reduce points. check if score is zero then present a losing msg.
function pointReduction() {
    score--;
    if (score === 0) {
        displayMessage("message", "👎 You Lose! Try again.");
        document.querySelector(".number").textContent = numberToGuess;
    }
    document.querySelector('.score').textContent = score;
}

// Function to close the settings modal.
function closeModel() {
    blurModal.style.display = "none";
    settingsModal.style.display = "none";
    document.getElementById("newScore").value = "";
    document.getElementById("newMin").value = "";
    document.getElementById("newMax").value = "";
    document.getElementById("messageSetting").textContent = "";
}
