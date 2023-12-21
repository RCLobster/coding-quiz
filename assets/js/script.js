/*
GOALS --> Create a timed quiz about JavaScript fundamentals that stores high scores
On Page Load: Display the introPage
1.* Clicking start game button will:
    --hide .introPage div
    --show .quizQuestions div
    --*start a timer with X seconds

While .quizQuestions is shown:
1. --A question is displayed from array of questions
2. --Answer choices for the current question are displayed in <li> format
3.--* When an answer choice is clicked,
    --if correct: display correct, add 1 point
    --*if incorrect: display incorrect, subtract X seconds from timer
    --delay then display the next question
4.--* When all questions are answered OR timer reaches 0 seconds
    --hide .quizQuestions div
    --show .dataEntry

While .dataEntry is shown:
1. --Display player score using #playerScore
2.--* Allow user to input their initials in #inputInitials
3. --When submit button OR enter is pressed
    --*save current score and input initials in localStorage
    --hide .dataEntry div
    --show .leaderboard

While .leaderboard is shown:
1. --Update display with score and initials from localStorage
2. Organize leaderboard from highest score to lowest
3. --Clicking clearScores-btn will erase all scores and initals from localStorage
    --leaderboard will display nothing
4. --Clicking returnToStart-btn will send player back to .introPage
    --hide .leaderboard
    --show .introPage

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
var leaderboardParent_ID = document.querySelector("#leaderboard-ul");
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
var currentQuestion = 1;
var correctAnswer;
var delay = 900;
var subtractPenalty = 13;

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

var playersArray = [];
var pointsArray = [];

//Code
function startGame() {
    //reset win condition bool
    hasWon = false;
    //set timerCount
    timerCount = 61;
    //reset current question
    currentQuestion = 1; 

    //toggleIntroPage OFF
    toggleIntroPage();
    //toggleQuestionsPage ON
    toggleQuestionsPage();
    //start timer
    startTimer();
    displayQuestions();
}

function startTimer() {
    timer = setInterval(function () {
        //subtrac 1 from timer count every second and display the count to webpage
        timerCount--;
        timerText_ID.textContent = timerCount;

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
    //console.log(correctAnswer);
    //check if we have more questions to display
    //if not, send player to .dataEntryPage
    if(currentQuestion > questionsToAsk.length){
        //console.log("This is working");
        playerScore_ID.textContent = timerCount;
        hasWon = true;
    }
    console.log("current q: " + currentQuestion);
    

    //reset UI feedback to be empty
    answerFeedback_ID.textContent = "";
    if(currentQuestion === 1) {

        //correctAnswer = q0Answers[3]
        question_ID.textContent = questionsToAsk[currentQuestion - 1];
        
        answer1_Btn.textContent = q0Answers[0];
        answer1_Btn.setAttribute("data-answer", "incorrect");

        answer2_Btn.textContent = q0Answers[1];
        answer2_Btn.setAttribute("data-answer", "incorrect");

        answer3_Btn.textContent = q0Answers[2];
        answer3_Btn.setAttribute("data-answer", "incorrect");

        answer4_Btn.textContent = q0Answers[3];
        answer4_Btn.setAttribute("data-answer", "correct");

    } else if(currentQuestion === 2){
        //currentQuestion === 1;
        //correctAnswer = q1Answers[0]
        question_ID.textContent = questionsToAsk[currentQuestion - 1];
        answer1_Btn.textContent = q1Answers[0];
        answer1_Btn.setAttribute("data-answer", "correct");

        answer2_Btn.textContent = q1Answers[1];
        answer2_Btn.setAttribute("data-answer", "incorrect");

        answer3_Btn.textContent = q1Answers[2];
        answer3_Btn.setAttribute("data-answer", "incorrect");

        answer4_Btn.textContent = q1Answers[3];
        answer4_Btn.setAttribute("data-answer", "incorrect");
    } else if(currentQuestion === 3){
        //currentQuestion === 2;
        //correctAnswer = q2Answers[2]
        question_ID.textContent = questionsToAsk[currentQuestion - 1];
        answer1_Btn.textContent = q2Answers[0];
        answer1_Btn.setAttribute("data-answer", "incorrect");

        answer2_Btn.textContent = q2Answers[1];
        answer2_Btn.setAttribute("data-answer", "incorrect");

        answer3_Btn.textContent = q2Answers[2];
        answer3_Btn.setAttribute("data-answer", "correct");

        answer4_Btn.textContent = q2Answers[3];
        answer4_Btn.setAttribute("data-answer", "incorrect");

    }
}

answer1_Btn.addEventListener("click", checkAnswer);
answer2_Btn.addEventListener("click", checkAnswer);
answer3_Btn.addEventListener("click", checkAnswer);
answer4_Btn.addEventListener("click", checkAnswer);

function checkAnswer(event) {
    event.preventDefault();

    //check the value of the button that was just clicked and grab its data-answer attribute
    var checkAttribute = event.target.getAttribute("data-answer");
    //console.log(currentQuestion, correctAnswer, q0Answers[3]);
    if(currentQuestion === 1 && checkAttribute === "correct"){
        //correct
        //console.log("Q0 is CORRECT");
        //display to the player they got the question correct
        answerFeedback_ID.textContent = "Correct!";
        //reset checkAttribute to no value
        checkAttribute = null;
        //go to the next question
        currentQuestion++;
        //delay call of function to display next question
        setTimeout(displayQuestions, delay);
        //displayQuestions();
    } else if (currentQuestion === 1 && checkAttribute === "incorrect"){
        //incorrect
        //console.log("q0 incorrect");
        //display to the player they got the question incorrect
        answerFeedback_ID.textContent = "Incorrect :(";
        //subtract time from the timer for incorrect answers
        timerCount -= subtractPenalty;
        checkAttribute = null;
        currentQuestion++;
        setTimeout(displayQuestions, delay);
        //displayQuestions();
    }

    if(currentQuestion === 2 && checkAttribute === "correct"){
        //console.log("q1 is CORRECT");
        answerFeedback_ID.textContent = "Correct!";
        checkAttribute = null;
        currentQuestion++;
        setTimeout(displayQuestions, delay);
    } else if(currentQuestion === 2 && checkAttribute === "incorrect"){
        //console.log("q1 is incorrect");
        answerFeedback_ID.textContent = "Incorrect :(";
        timerCount -= subtractPenalty;
        checkAttribute = null;
        currentQuestion++;
        setTimeout(displayQuestions, delay);
    }

    if(currentQuestion === 3 && checkAttribute === "correct"){
        //console.log("q2 is CORRECT");
        answerFeedback_ID.textContent = "Correct!";
        checkAttribute = null;
        currentQuestion++;
        setTimeout(displayQuestions, delay);
    } else if(currentQuestion === 3 && checkAttribute === "incorrect"){
        //console.log("q2 is incorrect");
        answerFeedback_ID.textContent = "Incorrect :(";
        timerCount -= subtractPenalty;
        checkAttribute = null;
        currentQuestion++;
        setTimeout(displayQuestions, delay);
    }
}

//leaderboard submission button
submit_Btn.addEventListener("click", function(event) {
    event.preventDefault();

    //create an object to hold our current player's initials and score
    var player = {
        initials: initials_Input.value,
        score: playerScore_ID.textContent
    };
    //grab whatever is stored and set equal to scoreToRender
    var scoreToRender = JSON.parse(localStorage.getItem("newScore"));
    
    //if nothing is stored, set scoreToRedner to be empty array
    if(scoreToRender === null ){
        scoreToRender = [];
    }
    //whatever initials and score were just created, add it to the scoreToRender array
    scoreToRender.push(player);
    
    //store the values of scoreToRender array in localStorage as newScore
    localStorage.setItem("newScore", JSON.stringify(scoreToRender));

    //clear out the leaderboard input box
    initials_Input.value = "";
    renderLeaderboard();
});

function renderLeaderboard() {
    toggleDataEntryPage();
    toggleLeaderboardPage();
    var scoreToRender = JSON.parse(localStorage.getItem("newScore"));
    // //console.log("saved score: " + scoreToRender);

    if (scoreToRender !== null){
        leaderboardParent_ID.innerHTML = "";
        for(var x = 0; x < scoreToRender.length; x++){
            //create new <li> element
            var newLI = document.createElement("li");
            //give newLI an id=#leaderboardScore
            newLI.setAttribute("id", "leaderboardScore");
            //create new <p> element
            var newPinit = document.createElement("p");
            //set newPinit to the value of localStorage initials
            newPinit.textContent = (scoreToRender[x].initials + "___________" + scoreToRender[x].score);
            //append  <p> element to newLI
            newLI.appendChild(newPinit);
            //append <li> element to the <ul> parent object
            leaderboardParent_ID.appendChild(newLI);
        }
    }
}

function restartGame() {
    console.log("Told to restart");
    toggleQuestionsPage();
    toggleDataEntryPage();
    init();
}

//erase the content of localStorage("newScore")
//erase all children of <ul> element with tag #leaderboard-ul
function eraseLeaderboard() {
    console.log("erasing leaderboard");
    localStorage.removeItem("newScore");
    
    while (leaderboardParent_ID.firstChild) {
        leaderboardParent_ID.removeChild(leaderboardParent_ID.firstChild);
    }
}
//eraseLeaderboard(leaderboardParent_ID);

//erases leaderboard data on click
clearScores_Btn.addEventListener("click", eraseLeaderboard);

//restarts the game on click
backToStart_Btn.addEventListener("click", restartGame);

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