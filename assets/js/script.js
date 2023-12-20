/*
GOALS --> Create a timed quiz about JavaScript fundamentals that stores high scores
On Page Load: Display the introPage
1.* Clicking start game button will:
    --hide .introPage div
    --show .quizQuestions div
    --*start a timer with X seconds

While .quizQuestions is shown:
1. --A question is displayed from array of questions
2. Answer choices for the current question are displayed in <li> format
3.* When an answer choice is clicked,
    if correct: display correct, add 1 point
    *if incorrect: display incorrect, subtract X seconds from timer
    delay then display the next question
4.--* When all questions are answered OR timer reaches 0 seconds
    --hide .quizQuestions div
    --show .dataEntry

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
var answer1_Btn = document.querySelector("#answerChoice1-btn");
var answer2_Btn = document.querySelector("#answerChoice2-btn");
var answer3_Btn = document.querySelector("#answerChoice3-btn");
var answer4_Btn = document.querySelector("#answerChoice4-btn");
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

//ARRAYS
var questionsToAsk = [
    "A string variable is wrapped in what?",
    "What does document.querySelector('.card') do?",
    "Which of the following is NOT a common variable type?"
];
var answersToShow = [];
var q0Answers = [
    "A) Parenthesis",
    "B) Square Brackets",
    "C) Exclamation Points", 
    "D) Quotation Marks"
];
var q1Answers = [
    "A) Selects all HTML elements with class card",
    "B) Asks a question about cards",
    "C) Selects all HTML elements with ID card",
    "D) I don't know what it does"
];
var q2Answers = [
    "A) Number",
    "B) Null",
    "C) Prompt",
    "D) String"
];

//Code
function startGame() {
    //reset win condition bool
    hasWon = false;
    //set timerCount
    timerCount = 61;

    //toggleIntroPage OFF
    toggleIntroPage();
    //toggleQuestionsPage ON
    toggleQuestionsPage();
    //start timer
    startTimer();
}

function startTimer() {
    timer = setInterval(function () {
        //subtrac 1 from timer count every second and display the count to webpage
        timerCount--;
        timerText_ID.textContent = timerCount;

        if (!hasWon && timerCount > 0) {
            displayQuestions();
        }

        //check for win condition
        if (hasWon && timerCount > 0) {
            clearInterval(timer);

            //toggleQuestionsPage OFF
            toggleQuestionsPage();
            //toggleDataEntryPage ON
            toggleDataEntryPage();
        }

        //if timerCount reaches 0, end quiz
        if (timerCount <= 0) {
            clearInterval(timer);
            //console.log("timer hit 0");

            //toggleQuestionsPage OFF
            toggleQuestionsPage();
            //toggleDataEntryPage ON
            toggleDataEntryPage();
        }
    }, 1000);
}

function displayQuestions() {
    var currentQuestion = 0;
    var correctAnswer;

    for(var x = 0; x < questionsToAsk.length; x++) {
        if(currentQuestion === 0){
            correctAnswer = q1Answers[3]
            question_ID.textContent = questionsToAsk[x];
            answer1_Btn.textContent = q0Answers[0];
            answer2_Btn.textContent = q0Answers[1];
            answer3_Btn.textContent = q0Answers[2];
            answer4_Btn.textContent = q0Answers[3];
            console.log(correctAnswer);
        } else if(currentQuestion === 1){
            correctAnswer = q2Answers[0]
            question_ID.textContent = questionsToAsk[x];
            answer1_Btn.textContent = q1Answers[0];
            answer2_Btn.textContent = q1Answers[1];
            answer3_Btn.textContent = q1Answers[2];
            answer4_Btn.textContent = q1Answers[3];
        } else if(currentQuestion === 2){
            correctAnswer = q2Answers[2]
            question_ID.textContent = questionsToAsk[x];
            answer1_Btn.textContent = q2Answers[0];
            answer2_Btn.textContent = q2Answers[1];
            answer3_Btn.textContent = q2Answers[2];
            answer4_Btn.textContent = q2Answers[3];
        }
    }

}

//when startGame button is clicked, startGame()
startGame_Btn.addEventListener("click", startGame);


function toggleIntroPage() {
    isIntroPageOn = !isIntroPageOn;
    console.log("isIntroPage: " + isIntroPageOn);

    if (!isIntroPageOn) {
        introPage_Div.hidden = true;
    } else {
        introPage_Div.hidden = false;
    }
}

function toggleQuestionsPage() {
    isQuestionsPageOn = !isQuestionsPageOn;
    console.log("isQuestionPage: " + isQuestionsPageOn)

    if (!isQuestionsPageOn) {
        quizQuestions_Div.hidden = true;
    } else {
        quizQuestions_Div.hidden = false;
    }
}

function toggleDataEntryPage() {
    isDataEntryPageOn = !isDataEntryPageOn;
    console.log("isDataEntryPage: " + isDataEntryPageOn);

    if (!isDataEntryPageOn) {
        dataEntry_Div.hidden = true;
    } else {
        dataEntry_Div.hidden = false;
    }
}

function toggleLeaderboardPage() {
    isLeaderboardPageOn = !isLeaderboardPageOn;
    console.log("isLeaderboardPage: " + isLeaderboardPageOn);

    if (!isLeaderboardPageOn) {
        leaderboard_Div.hidden = true;
    } else {
        leaderboard_Div.hidden = false;
    }
}

function init() {
    //toggleIntroPage ON
    toggleIntroPage();
    //toggleQuestionsPage OFF
    toggleQuestionsPage();
    //toggleDataEntryPage OFF
    toggleDataEntryPage();
    //toggleLeaderboardPage OFF
    toggleLeaderboardPage();

}

init();