let started         = false;
let inProgress      = false;
let timer           = 0;

let score           = 0;
//This will be used to calculate how much score it should give from the number of questions
let maxScore        = 100;

//Actual question number
let questionNumber  = 0;

// Create audio elements for correct and incorrect sounds
const correctSound = new Audio('./starter/assets/sfx/correct.wav');
const incorrectSound = new Audio('./starter/assets/sfx/incorrect.wav');

//Saving containers into variables
let startScreenContainer    = document.getElementById("start-screen");
let questionsContainer      = document.getElementById("questions");
let endScreenContainer      = document.getElementById("end-screen");

let questionTitleContainer  = document.getElementById("question-title");
let choicesContainer        = document.getElementById("choices");

let feedBackContainer       = document.getElementById("feedback");

let finalScoreContainer     = document.getElementById("final-score");

let timerContainer          = document.getElementById("time");

let questionProgress        = document.getElementById("questionProgress");
let actualScore             = document.getElementById("actualScore");

//Saving buttons into variables
let startButtonInput        = document.getElementById("start");
let submitScoreInput        = document.getElementById("submit");
let initialsInput           = document.getElementById("initials");

let timeDeductionElement    = document.getElementById('timeDeduction');
let plusScoreElement        = document.getElementById('plusScore');

const penaltyTime           = 10;

function startGame() {

    //Check if the game has not started yet
    if(!inProgress){
        //Start the game
        started     = true;
        inProgress  = true;

        //Star timer
        timer   = 75;
        countDown();

        //Hide the starting screen container
        startScreenContainer.classList.add("hide");

        //Display the questions container
        questionsContainer.classList.remove("hide");

        showQuestion(questionNumber);
    }

}

// Function for count down
function countDown(){
    
    //CHeck if the timer is still active
    if (timer >= 0 && inProgress) {
        //Display the timer's value
        timerContainer.innerHTML = timer;
  
        // Decrement the timer value
        timer--;
    
        // Call the function again after 1 second
        setTimeout(countDown, 1000);
    } else {
      showEndScreen();
    }
}

function showQuestion(_QuestionNumber){

    //Show the question progress
    questionProgress.innerHTML = "Question: " + (_QuestionNumber+1) + "/" + questions.length;

    //Show the Actual Score
    actualScore.innerHTML = "Score: " + score;

    choicesContainer.innerHTML  = "";

    questionTitleContainer.innerHTML = questions[_QuestionNumber].q;

    questions[_QuestionNumber].a.forEach((e, i) => {

        // Create a new button element
        let button = document.createElement('button');

        // Set the button's id
        button.id = i;

        // Set the button's text content
        button.textContent = e;

        // Add a click event listener to the button
        button.addEventListener('click', function() {
            // Call a function to check if the answer is correct
            checkAnswer(_QuestionNumber, i);
        });

        // Append the button to the container
        choicesContainer.appendChild(button);
    });
}

function checkAnswer(_questionNumber, _selectedOption) {
    // Compare the selected option with the correct answer
    let correctAnswerIndex = questions[_questionNumber].correct;

    feedBackContainer.classList.remove("hide");

    if (_selectedOption === correctAnswerIndex) {
        // The answer is correct
        feedBackContainer.innerHTML = "Correct!";

        //Add the points to the score
        score += maxScore / questions.length;

        showPlusScore();

        //Update the Actual Score DOM
        actualScore.innerHTML = "Score: " + score;

        // Play the correct sound
        correctSound.play();
    } else {
        // The answer is incorrect
        feedBackContainer.innerHTML = "Wrong!";

        //Reduce the timer with the penalty time
        timer -= penaltyTime;
        //Update the timer DOM
        timerContainer.innerHTML = timer;

        //Start the time Deduction animation
        showTimeDeduction();

        // Play the incorrect sound
        incorrectSound.play();
    }

    //Set a timeout to hide the feedback container
    setTimeout(function (){
        feedBackContainer.innerHTML = "";
        feedBackContainer.classList.add("hide");
    }, 1500);

    //Increase the actual question number
    questionNumber += 1;

    //Go to the next question
    //Check if there are any questions left
    if(questionNumber < questions.length){
        //There are more questions, show the next
        showQuestion(questionNumber);
    }else {
        //There are no more questions show the End Screen
        showEndScreen();
    }
}

// Function to show the time deduction with animation
function showTimeDeduction() {
    timeDeductionElement.classList.remove('hide');
    timeDeductionElement.innerHTML  = "-" + penaltyTime;
    setTimeout(() => {
      timeDeductionElement.classList.add('hide');
    }, 2000);
}

// Function to show the plus score
function showPlusScore() {
    plusScoreElement.classList.remove('hide');
    plusScoreElement.innerHTML  = "+" + maxScore / questions.length;;
    setTimeout(() => {
        plusScoreElement.classList.add('hide');
    }, 2000);
}

function showEndScreen() {
    //Set the timer back to 0
    timer       = 0;

    //set the started variable back to false
    inProgress  = false;

    //Hide the questions container
    questionsContainer.classList.add("hide");

    //Show the End Screen
    endScreenContainer.classList.remove("hide");

    //Update the information
    finalScoreContainer.innerHTML   = score;
}

function saveDataToLocalStorage() {
    // Check if the game was played
    if (started) {
        // Retrieve existing data from local storage
        var existingData = localStorage.getItem('quizz');

        // Parse the existing data as JSON or initialize an empty array if no data exists
        var dataArray = existingData ? JSON.parse(existingData) : [];

        // Add the new entry to the data array
        dataArray.push({ key: initialsInput.value, number: score });

        // Convert the updated data array to a JSON string
        var jsonString = JSON.stringify(dataArray);

        // Save the updated JSON string to local storage
        localStorage.setItem('quizz', jsonString);

        // Clear the initials input
        initialsInput.value = "";

        // Redirect the user to the highscore page
        window.location.href = "highscores.html";
    }
}

//Start the game
startButtonInput.addEventListener('click', function() {
    // Call the startGame function when the button is clicked
    startGame();
});


//Save Data
submitScoreInput.addEventListener('click', function() {
    // Call the saveDataToLocalStorage function when the button is clicked
    saveDataToLocalStorage();
});