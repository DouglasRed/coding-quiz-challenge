var quizTimer = document.querySelector("#time");
var startButtonEl = document.querySelector("#start-btn");
var nextButtonEl = document.querySelector("#next-btn");
var questionContainerEl = document.querySelector("#question-container");
var mainContainerEl = document.querySelector("#container");
var questionEl = document.querySelector("#question-text");
var answerButtonEl = document.querySelector("#answer-btns");
var saveButtonEl = document.querySelector("#save-btn");
var quizButtonEl = document.querySelector(".quiz-btn");
var username = document.querySelector(".text-input");
var currentQuestionIndex;
var shuffledQuestions;
var highscoresEl = document.querySelector("#highscores");
var maxHighScore = 5;
var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
//  Declares the quiz function and adds time to the timer
var startQuiz = function () {
  var timer = 30;
  var score = 0;
  quizTimer.textContent = timer;
  var timeInterval = setInterval(function () {
    if (timer > 0) {
      quizTimer.textContent = timer;
      timer--;
    } else {
      quizTimer.textContent = 0;
      clearInterval(timeInterval);
      mainContainerEl.classList.add("hide");
      highscoresEl.classList.remove("hide");
      document.querySelector(".finalScore").innerText = score;
      alert("Time has expired");
    }
  }, 1000);
  // Shuffles the questions randomly
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  // used to ensure we cover each question
  currentQuestionIndex = 0;
  //Hides the start button once it is clicked
  startButtonEl.classList.add("hide");
  nextButtonEl.classList.remove("hide");
  //hides the intro text and allows the button div to be displayed
  document.querySelector(".btn-col").classList.remove("hide");
  document.querySelector(".intro-text").classList.add("hide");
  // calls the random
  setNextQuestion();

  //will remove next button and display a new random question
  function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
    // quizButtonEl.classList.add("hide");
  }

  function showQuestion(question) {
    var question = questions[currentQuestionIndex];
    // changes the text of the question
    questionEl.innerText = question.question;
    // creates new buttons and the text for the button
    question.answers.forEach((answer) => {
      var button = document.createElement("button");
      button.innerText = answer.text;
      //styles the button dynamically
      button.classList.add("btn", "quiz-btn");
      // button.classList.add("quiz-btn");
      //Gives the button a class of correct
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      //if the buttons are clicked run the selectAnswer function and also appends the buttons to the btn div/container
      button.addEventListener("click", selectAnswer);

      answerButtonEl.appendChild(button);
    });
  }

  //removes the next button once it is clicked
  function resetState() {
    nextButtonEl.classList.add("hide");
    quizButtonEl.classList.add("hide");
    answerButtonEl.innerHTML = "";
  }

  function selectAnswer(e) {
    var selectedButton = e.target;
    var correct = selectedButton.dataset.correct;

    setStatusClass(questionContainerEl, correct);
    Array.from(answerButtonEl.children).forEach((button) => {
      setStatusClass(button, button.dataset.correct);
    });
    if ((selectedButton = correct)) {
      score++;
    } else {
      timer -= 3;
      if (score > 0) {
        score--;
      }
    }
    //Determine if the next question should be shown or if to end quiz.
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
      nextButtonEl.classList.remove("hide");
    } else {
      //Send user to highscore page
      mainContainerEl.classList.add("hide");
      highscoresEl.classList.remove("hide");
      // alert("You're score is " + score);
      document.querySelector(".finalScore").innerText = score;
      clearInterval(timeInterval);
      saveHighScore(score);
      // return score;
    }
  }
  nextButtonEl.addEventListener("click", () => {
    currentQuestionIndex++;
    setNextQuestion();
  });

  var setStatusClass = function (element, correct) {
    clearStatusClass();
    if (correct) {
      element.classList.add("btn-correct");
    } else {
      element.classList.add("btn-wrong");
    }

    function clearStatusClass() {
      questionContainerEl.classList.remove("btn-correct");
      questionContainerEl.classList.remove("btn-wrong");
    }
  };
  var saveHighScore = function (event) {
    event.preventDefault();
    document.querySelector(".finalScore").innerText = score;
    username.addEventListener("keyup", () => {
      saveButtonEl.disabled = !username.value;
      window.location.assign("./index.html");
    });

    var scoreContainer = {
      score: score,
      name: username.value,
    };
    highScores.push(scoreContainer);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5);

    localStorage.setItem("highscores", JSON.stringify(score));

    console.log(highScores);
  };
  saveButtonEl.addEventListener("click", saveHighScore);
};

//The array with all of the questions and multiple choice answers
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
    question: "Arrays in JavaScript can be used to store ____.",
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
