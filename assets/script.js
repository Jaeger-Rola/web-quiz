// Get HTML elements
var startButton = document.getElementById("start");
var quizSection = document.getElementById("quiz");
var highscoreSection = document.getElementById("highscores");
var questionEl = document.getElementById("question");
var labelA = document.getElementById("labelA");
var labelB = document.getElementById("labelB");
var labelC = document.getElementById("labelC");
var labelD = document.getElementById("labelD");
var submitButton = document.getElementById("submit");
var countdownEl = document.getElementById("countdown");
var scoreList = document.getElementById("scoreList");
var initialsInput = document.getElementById("initials");
var saveScoreButton = document.getElementById("saveScore");

// Set global variables
var score = 0;
var currentQuestion = 0;
var timeLeft = 60;
var timerInterval;

// List of quiz questions and answers
var quizQuestions = [
	{
		question: "Which of the following is not a programming language?",
		choices: {
			a: "Java",
			b: "Python",
			c: "HTML",
			d: "C++"
		},
		answer: "c"
	},
	{
		question: "What does CSS stand for?",
		choices: {
			a: "Computer Style Sheets",
			b: "Cascading Style Sheets",
			c: "Creative Style Sheets",
			d: "Crazy Style Sheets"
		},
		answer: "b"
	},
	{
		question: "Which of the following is not a programming paradigm?",
		choices: {
			a: "Procedural",
			b: "Functional",
			c: "Object-Oriented",
			d: "Sequential"
		},
		answer: "d"
	},
	{
		question: "What is the correct syntax for a for loop in JavaScript?",
		choices: {
			a: "for (i = 0; i <= 10; i++)",
			b: "for (var i = 0; i <= 10; i++)",
			c: "for (i = 0; i <= 10)",
			d: "for (var i = 0; i <= 10)"
		},
		answer: "b"
	},
	{
		question: "What method would you use to add an element to the end of an array?",
		choices: {
			a: "shift()",
			b: "splice()",
			c: "push()",
			d: "join()"
		},
		answer: "c"
	}
];

// Start the quiz
function startQuiz() {
	// Hide start button and show quiz section
	startButton.style.display = "none";
	quizSection.style.display = "block";

	// Set timer
	timerInterval = setInterval(function() {
		timeLeft--;
		countdownEl.textContent = timeLeft;

		// End quiz when time is up
		if (timeLeft <= 0) {
			endQuiz();
		}
	}, 1000);

	// Display first question
	displayQuestion();
}

// Display a quiz question
function displayQuestion() {
	// Get current question from quizQuestions array
	var questionObj = quizQuestions[currentQuestion];

	// Display question and answer choices
	questionEl.textContent = questionObj.question;
	labelA.textContent = questionObj.choices.a;
	labelB.textContent = questionObj.choices.b;
	labelC.textContent = questionObj.choices.c;
	labelD.textContent = questionObj.choices.d;
}

// Submit answer and go to next question
function submitAnswer() {
	// Get selected answer
	var selectedAnswer = document.querySelector('input[name="choice"]:checked').value;

	// Check if answer is correct
	if (selectedAnswer === quizQuestions[currentQuestion].answer) {
		score++;
	} else {
		timeLeft -= 10;
	}

	// Move to next question
	currentQuestion++;
	if (currentQuestion >= quizQuestions.length) {
		endQuiz();
	} else {
		displayQuestion();
	}
}

// End the quiz and show highscores section
function endQuiz() {
	// Clear timer
	clearInterval(timerInterval);

	// Hide quiz section and show highscores section
	quizSection.style.display = "none";
	highscoreSection.style.display = "block";

	// Display score
	scoreList.innerHTML = "<li>Score: " + score + "</li>";
}

// Save score to localStorage
function saveScore(event) {
	event.preventDefault();

	// Get user initials
	var initials = initialsInput.value.trim();

	// Check if initials are valid
	if (initials === "") {
		alert("Please enter your initials.");
		return;
	}

	// Get high scores from localStorage
	var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

	// Add new score to high scores list
	var newScore = {
		initials: initials,
		score: score
	};
	highScores.push(newScore);

	// Sort high scores by score (descending)
	highScores.sort(function(a, b) {
		return b.score - a.score;
	});

	// Save high scores to localStorage
	localStorage.setItem("highScores", JSON.stringify(highScores));

	// Display high scores
	displayHighScores();
}

//// Display high scores on page
//function displayHighScores() {
//	// Get high scores from localStorage
//	var highScores = JSON.parse(localStorage.getItem("highScores"));
//	
//	// Create list items for high scores
//	scoreList.innerHTML = "";
//	for (var i = 0; i < highScores.length; i++) {
//		var scoreItem = document.createElement("li");
//		scoreItem.textContent = highScores[i].initials + " - " + highScores[i].score;
//		scoreList.appendChild(scoreItem);
//	}
//}

// Display high scores on page
function displayHighScores() {
	// Get high scores from localStorage
	var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

	// Create list items for high scores
	scoreList.innerHTML = "";
	for (var i = 0; i < highScores.length; i++) {
		var scoreItem = document.createElement("li");
		scoreItem.textContent = highScores[i].initials + " - " + highScores[i].score;
		scoreList.appendChild(scoreItem);
	}
}
// Display high scores when page loads
displayHighScores();

// Start quiz when start button is clicked
startButton.addEventListener("click", startQuiz);

// Submit answer when submit button is clicked
submitButton.addEventListener("click", submitAnswer);

// Save score when save button is clicked
saveScoreButton.addEventListener("click", saveScore);
