var quizTimer = document.querySelector("#time");
var startButtonEl = document.querySelector("#start-btn");
var nextButtonEl = document.querySelector("#next-btn");
var questionContainerEl = document.querySelector("#question-container");
var questionEl = document.querySelector("#question-text");
var answerButtonEl = document.querySelector("#answer-btns");
var currentQuestionIndex;
var shuffledQuestions;

var startQuiz = function () {
  var timer = 5;
  quizTimer.textContent = timer;
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  startButtonEl.classList.add("hide");
  nextButtonEl.classList.remove("hide");
  document.querySelector(".btn-col").classList.remove("hide");
  document.querySelector(".intro-text").classList.add("hide");
  setNextQuestion();
};

function setNextQuestion() {
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionEl.innerText = question.question;
  question.answers.forEach((answer) => {
    var button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListner("click", selectAnswer);
    answerButtonEl.appendChild(button);
  });
}

function selectAnswer(e) {}

var questions = [
  {
    question: "Commonly used data types DO NOT include:",
    answers: [
      { text: "1. strings", correct: false },
      { text: "2. booleans", correct: false },
      { text: "3. alerts", correct: true },
      { text: "4. numbers", correct: false },
    ],
  },
  {
    question: "The condition in an if / else statement is enclosed with _____.",
    answers: [
      { text: "1. quotes", correct: false },
      { text: "2. curly brackets", correct: false },
      { text: "3. parenthesis", correct: true },
      { text: "4. square brackets", correct: false },
    ],
  },
  {
    question: "Arrays in JavaScript can be usede to store ____.",
    answers: [
      { text: "1. numbers and strings", correct: false },
      { text: "2. other arrays", correct: false },
      { text: "3. booleans", correct: false },
      { text: "4. all of the above", correct: true },
    ],
  },
  {
    question:
      "String values must be enclosed within ____ when being assigned to variables.",
    answers: [
      { text: "1. commas", correct: false },
      { text: "2. curly brackets", correct: false },
      { text: "3. quotes", correct: true },
      { text: "4. parenthesis", correct: false },
    ],
  },
  {
    question:
      "A very useful tool used during the development and debugger for printing content to the debugger is:",
    answers: [
      { text: "1. JavaScript", correct: false },
      { text: "2. terminal/bash", correct: false },
      { text: "3. for loops", correct: false },
      { text: "4. console.log", correct: true },
    ],
  },
];
// setTimeout(startQuiz, 5000);
startButtonEl.addEventListener("click", startQuiz);
