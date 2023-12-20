/*
GOALS --> Create a timed quiz about JavaScript fundamentals that stores high scores
On Page Load: Display the introPage
1.* Clicking start game button will:
    --hide .introPage div
    --show .quizQuestions div
    --*start a timer with X seconds

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
var timerText_ID = document.querySelector("#timer-text");
//BUTTONS
var startGame_Btn = document.querySelector("#startGame-btn");
var submit_Btn = document.querySelector("#submitInitials-btn");
var backToStart_Btn = document.querySelector("#returnToStart-btn");
var clearScores_Btn = document.querySelector("#clearScores-btn");
//INPUTS
var initials_Input = document.querySelector("#inputInitials");

//VARIABLES
var hasWon = false;
var timer;
var timerCount;

var isIntroPageOn = false;
var isQuestionsPageOn = true;
var isDataEntryPageOn = true;
var isLeaderboardPageOn = true;

//Code
function startGame() {
    //hide the introPage div and show quizQuestion div
    // introPage_Div.hidden = true;
    // quizQuestions_Div.hidden = false;
    toggleIntroPage();
    toggleQuestionsPage();

    //reset win condition bool
    hasWon = false;
    //set timerCount
    timerCount = 10;
    //start timer
    startTimer();
}

function startTimer() {
    timer = setInterval(function(){
        //subtrac 1 from timer count every second and display the count to webpage
        timerCount--;
        timerText_ID.textContent = timerCount;
    }, 1000);

    //check for win condition
    if (hasWon && timerCount > 0){
        clearInterval(timer);
        //show .dataEntry div
        // quizQuestions_Div.hidden = true;
        // dataEntry_Div.hidden = false;
    }

    //if timerCount reaches 0, end quiz
    if (timerCount <= 0){
        clearInterval(timer);
        //show .dataEntry div
        // quizQuestions_Div.hidden = true;
        toggleQuestionsPage();
        // dataEntry_Div.hidden = false;
        toggleDataEntryPage();
    }
}

//when startGame button is clicked, startGame()
startGame_Btn.addEventListener("click", startGame);

function toggleIntroPage() {
    isIntroPageOn = !isIntroPageOn;
    console.log("isIntroPage: " + isIntroPageOn);
    
    if(!isIntroPageOn) {
        introPage_Div.hidden = true;
    } else {
        introPage_Div.hidden = false;
    }
}

function toggleQuestionsPage() {
    isQuestionsPageOn = !isQuestionsPageOn;
    console.log("isQuestionPage" + isQuestionsPageOn)

    if(!isQuestionsPageOn) {
        quizQuestions_Div.hidden = true;
    } else {
        quizQuestions_Div.hidden = false;
    }
}

function toggleDataEntryPage() {
    isDataEntryPageOn = !isDataEntryPageOn;
    console.log("isDataEntryPage: " + isDataEntryPageOn);

    if(!isDataEntryPageOn) {
        dataEntry_Div.hidden = true;
    } else {
        dataEntry_Div.hidden = false;
    }
}

function toggleLeaderboardPage() {
    isLeaderboardPageOn = !isLeaderboardPageOn;
    console.log("isLeaderboardPage: " + isLeaderboardPageOn);

    if(!isLeaderboardPageOn) {
        leaderboard_Div.hidden = true;
    } else {
        leaderboard_Div.hidden = false;
    }
}


function init() {
    //display introPage and hide all other divs
    toggleIntroPage();
    // introPage_Div.hidden = false;
    toggleQuestionsPage();
    // quizQuestions_Div.hidden = true;
    toggleDataEntryPage();
    // dataEntry_Div.hidden = true;
    toggleLeaderboardPage();
    // leaderboard_Div.hidden = true;
}

init();