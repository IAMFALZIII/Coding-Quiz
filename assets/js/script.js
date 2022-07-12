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

var score = 0;
var questionIndex = 0;

var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");
var  questionsDiv = document.querySelector("# questionsDiv");
var wrapper = document.querySelector("#wrapper");

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

    questionIndex++;

    if (questionIndex >= questions.length) {
        allDone();
        createDiv.textContent = "End of quiz!!" + " " + "You got " + score + "/" + questions.length + "correct!!";
    } else {
        render(questionIndex);
    }
    questionsDiv.appendChild(createDiv);
}

