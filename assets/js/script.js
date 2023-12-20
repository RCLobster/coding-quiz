/*
GOALS --> Create a timed quiz about JavaScript fundamentals that stores high scores
On Page Load: Display the introPage
1.* Clicking start game button will:
    hide .introPage div
    disable startGame-btn button
    show .quizQuestions div
    *start a timer with X seconds

While .quizQuestions is shown:
1. A question is displayed from array of questions
2. Answer choices for the current question are displayed in <li> format
3.* When an answer choice is clicked,
    if correct: display correct, add 1 point
    *if incorrect: display incorrect, subtract X seconds from timer
    delay then display the next question
4.* When all questions are answered OR timer reaches 0 seconds
    hide .quizQuestions div
    show .dataEntry

While .dataEntry is shown:
1. Display player score using #playerScore
2.* Allow user to input their initials in #inputInitials
3. When submit button OR enter is pressed
    *save current score and input initials in localStorage
    hide .dataEntry div
    show .leaderboard

While .leaderboard is shown:
1. Update display with score and initials from localStorage
2. Organize leaderboard from highest score to lowest
3. Clicking clearScores-btn will erase all scores and initals from localStorage
    leaderboard will display nothing
4. Clicking returnToStart-btn will send player back to .introPage
    hide .leaderboard
    show .introPage


On load: Display the introPage
2. A question is displayed on screen with 4 answer choices in a list
4. Display the next question
5. Loop 3 and 4 until all questions are displayed OR time runs out
6. Allow player to see their score and enter intials
7. Save score and initials to the leader board in localStorage AND on screen in an <li>
-------------------------------------------------------------------------------------------------------*/

//CLASS REFERENCES
var introPage_Div = document.querySelector(".introPage");
var quizQuestions_Div = document.querySelector(".quizQuestions");
var dataEntry_Div = document.querySelector(".dataEntry");
var leaderboard_Div = document.querySelector(".leaderboard");
//ID REFERENCES
var question_ID = document.querySelector("#question");
var answerList_ID = document.querySelector("#quizAnswers");
var answerFeedback_ID = document.querySelector("#answerFeedback");
var playerScore_ID = document.querySelector("#playerScore");
var leaderboardParent_ID = document.querySelector("#leaderboard");
//BUTTONS
var startGame_Btn = document.querySelector("#startGame-btn");
var submit_Btn = document.querySelector("#submitInitials-btn");
var backToStart_Btn = document.querySelector("#returnToStart-btn");
var clearScores_Btn = document.querySelector("#clearScores-btn");
//INPUTS
var initials_Input = document.querySelector("#inputInitials");

//VARIABLES
var hasWon = false;
var timer = 0;

//Code
function startGame() {

}

//when startGame button is clicked, startGame()
startGame_Btn.addEventListener("click", startGame);

function init() {
    //display introPage and hide all other divs
    introPage_Div.hidden = false;
    quizQuestions_Div.hidden = true;
    dataEntry_Div.hidden = true;
    leaderboard_Div.hidden = true;
}

init();