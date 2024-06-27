const quizData = [
    {
        question: "Kas ir galvaspilsēta Latvijā?",
        answers: ["Rīga", "Liepāja", "Daugavpils", "Jelgava"],
        correctAnswer: "Rīga"
    },
    {
        question: "Kas ir lielākais okeāns pasaulē?",
        answers: ["Atlantijas okeāns", "Klusa okeāns", "Indijas okeāns", "Dienvidu ledus okeāns"],
        correctAnswer: "Klusa okeāns"
    },
    {
        question: "Kurš ir slavenākais zinātnieks ar teoriju par relativitāti?",
        answers: ["Isaak Nūtons", "Alberts Einšteins", "Stephens Hoking", "Niels Bohrs"],
        correctAnswer: "Alberts Einšteins"
    },
    {
        question: "Kurā gadā bija pirmais cilvēka ceļojums uz Mēness?",
        answers: ["1969", "1971", "1965", "1975"],
        correctAnswer: "1969"
    },
    {
        question: "Kāds ir pasaules augstākais kalns?",
        answers: ["Mount Everest", "K2", "Kangchenjunga", "Lhotse"],
        correctAnswer: "Mount Everest"
    },
    {
        question: "Kāda ir Zemes planētas attālums no Saules?",
        answers: ["74,09 miljoni jūdzes", "68,35 miljoni jūdzes", "92,96 miljoni jūdzes", "100,99 miljoni jūdzes"],
        correctAnswer: "92,96 miljoni jūdzes"
    },
    {
        question: "Kurš ir vislielākais dzīvnieks uz Zemes?",
        answers: ["Krokodils", "Vālens", "Lampreija", "Zilonis"],
        correctAnswer: "Zilonis"
    },
    {
        question: "Kā saucas pasaules lielākā upe?",
        answers: ["Nilss", "Amazonka", "Jangce", "Misisipi"],
        correctAnswer: "Amazonka"
    },
    {
        question: "Kādā valstī atrodas Tadž Mahals?",
        answers: ["Indija", "Turcija", "Ēģipte", "Ķīna"],
        correctAnswer: "Indija"
    },
    {
        question: "Kurā gadā tika atklāts Internets?",
        answers: ["1995", "1983", "1990", "1976"],
        correctAnswer: "1990"
    }
];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementsByClassName('answer-btn');
const scoreElement = document.getElementById('score');
const resultsContainer = document.getElementById('results');
const resultScoreElement = document.getElementById('result-score');
const restartButton = document.getElementById('restart');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    showQuestion();
    for (let i = 0; i < answerButtons.length; i++) {
        answerButtons[i].addEventListener('click', selectAnswer);
    }
}

function showQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    for (let i = 0; i < answerButtons.length; i++) {
        answerButtons[i].textContent = currentQuestion.answers[i];
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correctAnswer = quizData[currentQuestionIndex].correctAnswer;
    if (selectedButton.textContent === correctAnswer) {
        selectedButton.style.backgroundColor = '#4CAF50';
        score++;
    } else {
        selectedButton.style.backgroundColor = '#FF0000';
    }
    disableAnswerButtons();
    updateScore();
    setTimeout(() => {
        resetAnswerButtons();
        showNextQuestion();
    }, 1000);
}


function disableAnswerButtons() {
    for (let i = 0; i < answerButtons.length; i++) {
        answerButtons[i].removeEventListener('click', selectAnswer);
    }
}

function updateScore() {
    scoreElement.textContent = score;
}

function showNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        setTimeout(() => {
            resetAnswerButtons();
            showQuestion();
            for (let i = 0; i < answerButtons.length; i++) {
                answerButtons[i].addEventListener('click', selectAnswer);
            }
        }, 100);
    } else {
        showResults();
    }
}

function showResults() {
    resultsContainer.classList.remove('hidden');
    resultScoreElement.textContent = score;
}

function restartQuiz() {
    resultsContainer.classList.add('hidden');
    currentQuestionIndex = 0;
    score = 0;
    updateScore();
    resetAnswerButtons();
    startQuiz();
}

function resetAnswerButtons() {
    for (let i = 0; i < answerButtons.length; i++) {
        answerButtons[i].style.backgroundColor = '#f0f0f0';
    }
}


restartButton.addEventListener('click', restartQuiz);

startQuiz();
