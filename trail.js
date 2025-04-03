const quizData = [
    {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correct: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Mars", "Jupiter", "Venus", "Saturn"],
        correct: 0
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
        correct: 1
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
        correct: 2
    },
    {
        question: "What is the chemical symbol for gold?",
        options: ["Go", "Gd", "Au", "Ag"],
        correct: 2
    },
    {
        question: "Which country is home to the kangaroo?",
        options: ["New Zealand", "South Africa", "Australia", "Brazil"],
        correct: 2
    },
    {
        question: "What is the largest organ in the human body?",
        options: ["Brain", "Liver", "Skin", "Heart"],
        correct: 2
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
        correct: 1
    },
    {
        question: "What is the capital of Japan?",
        options: ["Seoul", "Beijing", "Tokyo", "Bangkok"],
        correct: 2
    },
    {
        question: "Which element has the chemical symbol 'O'?",
        options: ["Gold", "Oxygen", "Iron", "Carbon"],
        correct: 1
    },
    {
        question: "What is the largest planet in our solar system?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        correct: 2
    },
    {
        question: "Who is known as the father of modern physics?",
        options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Stephen Hawking"],
        correct: 1
    },
    {
        question: "What is the chemical formula for water?",
        options: ["CO2", "H2O", "NaCl", "CH4"],
        correct: 1
    },
    {
        question: "Which country is home to the Great Barrier Reef?",
        options: ["Brazil", "India", "Australia", "Thailand"],
        correct: 2
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correct: 3
    },
    {
        question: "Who invented the telephone?",
        options: ["Thomas Edison", "Alexander Graham Bell", "Nikola Tesla", "Guglielmo Marconi"],
        correct: 1
    },
    {
        question: "What is the capital of Canada?",
        options: ["Toronto", "Vancouver", "Montreal", "Ottawa"],
        correct: 3
    },
    {
        question: "Which planet is known as the 'Morning Star' or 'Evening Star'?",
        options: ["Mars", "Venus", "Mercury", "Jupiter"],
        correct: 1
    },
    {
        question: "What is the main component of the Sun?",
        options: ["Helium", "Oxygen", "Carbon", "Hydrogen"],
        correct: 3
    },
    {
        question: "Who painted 'The Starry Night'?",
        options: ["Pablo Picasso", "Claude Monet", "Vincent van Gogh", "Leonardo da Vinci"],
        correct: 2
    }
];

let currentQuestions = [];
let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 120;
let userAnswers = [];

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const feedbackEl = document.getElementById("feedback");
const correctAnswerEl = document.getElementById("correct-answer");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");
const startBtn = document.getElementById("start-btn");
const exitBtn = document.getElementById("exit-btn");
const reportEl = document.getElementById("report");

startBtn.addEventListener("click", startQuiz);
exitBtn.addEventListener("click", exitQuiz);

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function startQuiz() {
    currentQuestions = [...quizData];
    shuffleArray(currentQuestions);
    currentQuestions = currentQuestions.slice(0, 10); // Select first 10 questions
    currentQuestion = 0;
    score = 0;
    userAnswers = [];
    startBtn.style.display = "none";
    exitBtn.style.display = "inline-block";
    loadQuestion();
    startTimer();
}

function loadQuestion() {
    const question = currentQuestions[currentQuestion];
    questionEl.textContent = question.question;
    correctAnswerEl.textContent = "";
    feedbackEl.textContent = "";
    
    optionsEl.innerHTML = "";
    question.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.addEventListener("click", () => checkAnswer(index));
        optionsEl.appendChild(button);
    });
}

function checkAnswer(selectedIndex) {
    const question = currentQuestions[currentQuestion];
    const correctAnswer = question.options[question.correct];
    
    userAnswers.push({
        question: question.question,
        userAnswer: question.options[selectedIndex],
        correctAnswer: correctAnswer,
        isCorrect: selectedIndex === question.correct
    });

    if (selectedIndex === question.correct) {
        score++;
        feedbackEl.textContent = "Correct!";
        feedbackEl.style.color = "green";
    } else {
        feedbackEl.textContent = "Incorrect!";
        feedbackEl.style.color = "red";
    }
    
    correctAnswerEl.textContent = `The correct answer is: ${correctAnswer}`;
    
    optionsEl.innerHTML = "";
    const nextButton = document.createElement("button");
    nextButton.textContent = "Next Question";
    nextButton.classList.add("next-btn");
    nextButton.addEventListener("click", nextQuestion);
    optionsEl.appendChild(nextButton);
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < currentQuestions.length) {
        loadQuestion();
    } else {
        endQuiz();
    }
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = `Time: ${timeLeft}s`;
        if (timeLeft <= 0) {
            endQuiz();
        }
    }, 1000);
}

function endQuiz() {
    clearInterval(timer);
    questionEl.textContent = "Quiz Completed!";
    optionsEl.innerHTML = "";
    feedbackEl.textContent = "";
    correctAnswerEl.textContent = "";
    scoreEl.textContent = `Final Score: ${score} out of ${currentQuestions.length}`;
    timerEl.style.display = "none";
    exitBtn.textContent = "Restart Quiz";
    exitBtn.removeEventListener("click", exitQuiz);
    exitBtn.addEventListener("click", restartQuiz);
    showReport();
}

function exitQuiz() {
    clearInterval(timer);
    questionEl.textContent = "Quiz Exited";
    optionsEl.innerHTML = "";
    feedbackEl.textContent = "";
    correctAnswerEl.textContent = "";
    scoreEl.textContent = `Final Score: ${score} out of ${currentQuestion}`;
    timerEl.style.display = "none";
    exitBtn.textContent = "Restart Quiz";
    exitBtn.removeEventListener("click", exitQuiz);
    exitBtn.addEventListener("click", restartQuiz);
    showReport();
}

function showReport() {
    reportEl.innerHTML = "<h2>Quiz Report</h2>";
    userAnswers.forEach((answer, index) => {
        const reportItem = document.createElement("div");
        reportItem.classList.add("report-item");
        reportItem.innerHTML = `
            <p><strong>Question ${index + 1}:</strong> ${answer.question}</p>
            <p class="${answer.isCorrect ? 'correct' : 'incorrect'}">
                Your answer: ${answer.userAnswer}
            </p>
            <p>Correct answer: ${answer.correctAnswer}</p>
        `;
        reportEl.appendChild(reportItem);
    });
}

function restartQuiz() {
    timeLeft = 120;
    timerEl.style.display = "block";
    timerEl.textContent = `Time: ${timeLeft}s`;
    exitBtn.textContent = "Exit Quiz";
    exitBtn.removeEventListener("click", restartQuiz);
    exitBtn.addEventListener("click", exitQuiz);
    reportEl.innerHTML = "";
    startQuiz();
}