const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  {
    question: "which of the following is open source DBMS?",
    choice1: "MySQL",
    choice2: "NOSQL",
    choice3: "Microsoft SQL Server",
    choice4: "Microsoft Access",
    answer: 1
  },
  {
    question:
      " In which of the following formats data is stored in the database management system?",
    choice1: "Image",
    choice2: "Text",
    choice3: "Table",
    choice4: "Graph",
    answer: 3
  },
  {
    question: "What is information about data called?",
    choice1: "Hyper data",
    choice2: "Tera data",
    choice3: "Meta data",
    choice4: " Relations",
    answer: 3
  },
  {
    question: " Which of the following is known as a set of entities of the same type that share same properties, or attributes?",
    choice1: "Relation set",
    choice2: " Tuples",
    choice3: " Entity set",
    choice4: " Entity Relation model",
    answer: 3
  },
  {
    question: " Which command is used to remove a relation from an SQL?",
    choice1: "Delete",
    choice2: "Drop table",
    choice3: "Purge",
    choice4: "Remove",
    answer: 2
  }
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("/end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();