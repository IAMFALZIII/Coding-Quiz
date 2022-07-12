//* Questions for Quiz//

var  questionsDiv = [{
    title: "Commonly used data types DO NOT include:",
    answers: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts"
},

{
    title: "The condition in an if / else statement is enclosed within ____.",
    answers: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses"
},

{
    title: "Arrays in Javascript can be used to store ____.",
    answers: ["numbers and strings", "other arrays", "booleans", "all of the above"],
    answer: "all of the above"
},

{
    title: "String values must be enclosed within ____ when being assigned to variables.",
    answers: ["commas", "curly brackets", "quotes", "parenthesis"],
    answer: "all of the above"
},

{
    title: "String values must be enclosed within ____ when being assigned to variables.",
    answers: ["commas", "curly brackets", "quotes", "parenthesis"],
    answer: "quotes"
},

{
    title: "A very useful tool for used during development and debugging for printing content to the debugger is:",
    answers: ["Javascript", "terminal / bash", "for loops", "console log"],
    answer: "console.log"
}];

//*Working code with declared variables//

var score = 0;
var questionIndex = 0;

var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");
var  questionsDiv = document.querySelector("# questionsDiv");
var wrapper = document.querySelector("#wrapper");
//* Time for answering//
var timeLeft = 75;
var holdInt = 0;
var timePenalty = 10;
var ulCreate = document.createElement("ul");

//*Adding Timer when button to start is clicked//
timer.addEventListener("click", function () {
    if (holdInt === 0) {
        holdInt = setInterval(function () {
            timeLeft--;
            currentTime.textContent = "Time: " + timeLeft;

            if (timeLeft <= 0) {
                clearInterval(holdInt);
                allDone();
                currentTime.textContent = "Time is up!!";
            }
        }, 1000)
    }
    render(questionIndex);
});

//* Renders questions and answers to page//
function render(questionIndex) {
     questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";

    for (var i = 0; i < questions.length; i++) {
        var userQuestion = questions[questionIndex].title;
        var userAnswers = questions[questionIndex].answers
        questionsDiv.textContent = userQuestion;
    }

    userAnswers.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}

//* To compare answers//
function compare(event) {
    var element = event.target;
    
    if (element.matches("li")) {
        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct!"
        } else {
            timeLeft = timeLeft - timePenalty;
            createDiv.textContent = "Wrong! Correct answer is:" + questions[questionIndex].answer;
        }
    }

    //* This determines what question quiz taker is on//
    questionIndex++;

    if (questionIndex >= questions.length) {
        allDone();
        createDiv.textContent = "End of quiz!!" + " " + "You got " + score + "/" + questions.length + "correct!!";
    } else {
        render(questionIndex);
    }
    questionsDiv.appendChild(createDiv);
}

//* 'allDone' will append the last page//
function allDone() {
    questionsDiv.innerHTML = "";
    currentTime.innerHTML = "";

    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!"

    questionsDiv.appendChild(createH1);

    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionsDiv.appendChild(createP);

    //* Makes time remaining the score like in readme demo//
    if (timeLeft >= 0) {
        var timeRemaining = timeLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInt);
        createP.textContent = "Final Score: " + timeRemaining;

        questionsDiv.appendChild(createP2);
    }

    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    questionsDiv.appendChild(createLabel);

    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsDiv.appendChild(createInput);

    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    questionsDiv.appendChild(createSubmit);

    createSubmit.addEventListener("click", function () {
        var userInitials = createInput.value;

        if (userInitials === null) {
            console.log("No Initials Entered!!!");
        } else {
            var finalScore = {
                initials: userInitials,
                score: timeRemaining
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allscores");

            if(allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);

            window.location.replace("./highscores.html");
        }
    })
}